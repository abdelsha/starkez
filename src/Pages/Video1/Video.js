import { useRef, useState, useEffect } from "react";

import db from "../../Firebase/Firebase";
import './Video.css'
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as HangupIcon } from "./icons/hangup.svg";
import { ReactComponent as MoreIcon } from "./icons/more-vertical.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { retrieveFriendList, selectedFriend } from "../../Redux/Actions/UserState";
import { updateMessate } from "../../Redux/Actions/UserState";
import { getRealTimeConversations } from "../../Redux/Actions/UserState";





// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function Video() {
    const [currentPage, setCurrentPage] = useState("home");
    const [joinCode, setJoinCode] = useState("");
    const selectedFriend = useSelector((state)=>{
        return state.userState.selectedFriend;
      })
      const userstat = useSelector((state) => {
        return state.userState.user;
      });
      const dispatch = useDispatch();
    

    return (
        <div className="app">
            
            {currentPage === "home" ? (
                <Menu
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                    selectedFriend={selectedFriend}
                />
            ) : (
                <Videos
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                    selectedFriend={selectedFriend}
                />
            )}
        </div>
    );
}

function Menu({ joinCode, setJoinCode, setPage,selectedFriend }) {
    return (
        <div className="home">
            {console.log(selectedFriend.UID)}
            {selectedFriend.UID? setPage("create"):null}
            <div className="create box">
                <button onClick={() => setPage("create")}>
                    Create Call</button>
            </div>

            <div className="answer box">
                <input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Join with code"
                />
                <button onClick={() => setPage("join")}>
                    Answer</button>
            </div>
        </div>
    );
}

function Videos({ mode, callId, setPage, selectedFriend }) {
    const userstat = useSelector((state) => {
        return state.userState.user;
      });
      const friends = useSelector((state)=>{
        return state.userState.friendList;
      })
    useEffect(() => {
        try{
            dispatch(retrieveFriendList())
        }catch(err){

        }
    }, [])
      const dispatch = useDispatch();
    const [webcamActive, setWebcamActive] = useState(false);
    const [roomId, setRoomId] = useState(callId);
    const [showFriend, setShowFriend]= useState(false);

    const localRef = useRef();
    const remoteRef = useRef();
    const initChat = (user)=>{
        console.log(user)
        const messObj={
            user_uid_1: userstat.uid,
            user_uid_2:user.UID,
            message: `${selectedFriend.fullName} invited you to a call, 
            enter ID ${roomId} in video page to join`,
          }
          setShowFriend(false);
            dispatch(updateMessate(messObj,user.UID))
            .then(()=>{})
        
      }
    const setupSources = async () => {
        const localStream = await navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        });
        const remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        localRef.current.srcObject = localStream;
        remoteRef.current.srcObject = remoteStream;

        setWebcamActive(true);

        if (mode === "create") {
            !selectedFriend.UID&&setShowFriend(true);
            const callDoc = db.collection("calls").doc();
            const offerCandidates = callDoc.collection("offerCandidates");
            const answerCandidates = callDoc.collection("answerCandidates");

            setRoomId(callDoc.id);
            if(selectedFriend.UID){
                console.log(selectedFriend)
                const messObj={
                  user_uid_1: userstat.uid,
                  user_uid_2:selectedFriend.UID,
                  message: `${selectedFriend.fullName} invited you to a call, 
                  enter ID ${callDoc.id} in video page to join`,
                }
            
                  dispatch(updateMessate(messObj,selectedFriend.UID))
                  .then(()=>{})
                
                
              
        }
        const initChat = (user)=>{
        
        const messObj={
            user_uid_1: userstat.uid,
            user_uid_2:selectedFriend.UID,
            message: `${selectedFriend.fullName} invited you to a call, 
            enter ID ${callDoc.id} in video page to join`,
          }
      
            dispatch(updateMessate(messObj,user.UID))
            .then(()=>{})
        //console.log(user)
      }
            pc.onicecandidate = (event) => {
                event.candidate &&
                    offerCandidates.add(event.candidate.toJSON());
            };

            const offerDescription = await pc.createOffer();
            await pc.setLocalDescription(offerDescription);

            const offer = {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            };

            await callDoc.set({ offer });

            callDoc.onSnapshot((snapshot) => {
                const data = snapshot.data();
                if (!pc.currentRemoteDescription && data?.answer) {
                    const answerDescription = new RTCSessionDescription(
                        data.answer
                    );
                    pc.setRemoteDescription(answerDescription);
                }
            });

            answerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(
                            change.doc.data()
                        );
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        } else if (mode === "join") {
            setShowFriend(false)
            const callDoc = db.collection("calls").doc(callId);
            const answerCandidates = callDoc.collection("answerCandidates");
            const offerCandidates = callDoc.collection("offerCandidates");

            pc.onicecandidate = (event) => {
                event.candidate &&
                    answerCandidates.add(event.candidate.toJSON());
            };

            const callData = (await callDoc.get()).data();

            const offerDescription = callData.offer;
            await pc.setRemoteDescription(
                new RTCSessionDescription(offerDescription)
            );

            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);

            const answer = {
                type: answerDescription.type,
                sdp: answerDescription.sdp,
            };

            await callDoc.update({ answer });

            offerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        let data = change.doc.data();
                        pc.addIceCandidate(new RTCIceCandidate(data));
                    }
                });
            });
        }
        

        pc.onconnectionstatechange = (event) => {
            if (pc.connectionState === "disconnected") {
                hangUp();
            }
        };
    };

    const hangUp = async () => {
        pc.close();

        if (roomId) {
            let roomRef = db.collection("calls").doc(roomId);
            await roomRef
                .collection("answerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            await roomRef
                .collection("offerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });

            await roomRef.delete();
        }

        window.location.reload();
    };

    return (
        <div className="videos">
            <video
                ref={localRef}
                autoPlay
                playsInline
                className="local"
                muted
            />
            <video ref={remoteRef} autoPlay playsInline className="remote" />

            <div className="buttonsContainer">
                <button
                    onClick={hangUp}
                    disabled={!webcamActive}
                    className="hangup button"
                >
                    <HangupIcon />
                </button>
                <div tabIndex={0} role="button" className="more button">
                    <MoreIcon />
                    <div className="popover">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(roomId);
                            }}
                        >
                            <CopyIcon /> Copy joining code
                        </button>
                    </div>
                </div>
            </div>
           {showFriend &&                
            <div className='listOfUsers'>
            <div className='listOfFriends'>
              <h2>Friends</h2>
              
              {friends.length > 0
                ? friends.map((user) => {
                    
                    return (
                      <div
                        onClick={() => {
                          initChat(user);
                          console.log(user);
                        }}
                        key={user.UID}
                        className='displayName'
                      >
                        <div className='displayPic'>
                          {user.sharedImg ? (
                            <img src={user.sharedImg} all="" />
                          ) : (
                            <img src="/images/user1.svg" all="" />
                          )}
                        </div>
                        <div style={{ margin: "0 10px" }}>
                          <span style={{ fontWeight: 500 }}>
                            {user.fullName ? user.fullName : "UserName"}
                          </span>
                          <span
                            className={
                              user.isOnline
                                ? `onlineStatus`
                                : `onlineStatusoff`
                            }
                          ></span>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            </div>
}
            {!webcamActive && (
                <div className="modalContainer">
                    <div className="modal">
                        <h3>
                            Turn on your camera and microphone and start the
                            call
                        </h3>
                        <div className="container">
                            <button
                                onClick={() => setPage("home")}
                                className="secondary"
                            >
                                Cancel
                            </button>
                            <button onClick={setupSources}>Start</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Video;

