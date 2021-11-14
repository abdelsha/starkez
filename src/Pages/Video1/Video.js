import db from '../../Firebase/Firebase';
import { auth, provider, storage } from "../../Firebase/Firebase";
import React, { createRef, useRef} from 'react';
import {useState, useEffect} from "react";
import VideoChat from './Components/VideoChat';
import { useSelector, useDispatch } from "react-redux";
import {  createOffer, initiateConnection, startCall, sendAnswer, addCandidate, initiateLocalStream, listenToConnectionEvents } from './RTCModule';


function Video(props){
    const [loaded, setLoaded] = useState("false");
    const userstat = useSelector((state) => {
    return state.userState.user;
  });
    const [state, setState]= useState({
        database: null,
        connectedUser:null, 
        localStream:null,
        localConnection:null,
    })
    useEffect(()=>{
        //console.log(courseStat)
        if(userstat){
          setLoaded("true");
          
        }
        
      },[userstat]);
    const doLogin = async (username, database, handleUpdate) => {
      try {
        db.collection("notifs")
          .doc("username")
          .delete()
          .then(() => {
            db.collection("notifs")
              .doc("username")
              .onSnapshot((querySnapshot) => {
                //console.log(querySnapshot.exists);
                const friends = [];

                querySnapshot.exists && querySnapshot.forEach((doc) => {
                  //console.log(doc.data().data)
                  handleUpdate(doc.data(), username);
                });
              });
          });
      } catch (error) {
        console.log(error);
      }
    };


    const doOffer = async(to, offer, database, username) =>{
        db.collection("notifs")
        .doc(to)
        .set({
            type: 'offer',
            from: username,
            offer: JSON.stringify(offer),
        })
        .then(()=>{
            console.log("done doOffer")
        })
    }
    const doAnswer = async(to, answer, database, username) =>{
        db.collection("notifs")
        .doc(to)
        .update({
            type: 'answer',
            from: username,
            answer: JSON.stringify(answer),
        })
        .then(()=>{
            console.log("done doAnswer")
        })
    }

    const doCandidate = async(to, candidate, database, username) =>{
        db.collection("notifs")
        .doc(to)
        .update({
            type: 'candidate',
            from: username,
            answer: JSON.stringify(candidate),
        })
        .then(()=>{
            console.log("done doCandidate")
        })
    }
      
    const dispatch = useDispatch();
    let localVideoRef= createRef();
    let remoteVideoRef= createRef();
    
    const componentDidMount = async () => {
        // initialize firebase
  
        // getting local video stream
        const localStream = await initiateLocalStream();
        localVideoRef.srcObject=localStream;
        // create the local connection

        const localConnection = await initiateConnection()
        setState({
            database:db,
            localStream,
            localConnection,
        })
  
      }
  
    function shouldComponentUpdate(nextProps, nextState) {
        // prevent rerenders if not necessary
        if (state.database !== nextState.database) {
          return false
        }
        if (state.localStream !== nextState.localStream) {
          return false
        }
        if (state.localConnection !== nextState.localConnection) {
          return false
        }
  
        return true
      }
       
  
     const startCall = async (username, userToCall) => {
      const { localConnection, database, localStream } = state;
      
      listenToConnectionEvents(localConnection, username, userToCall, database, remoteVideoRef, doCandidate)
      // create an offer
      createOffer(localConnection, localStream, userToCall, doOffer, database, username)
    }
  
     const onLogin = async (username) => {
        // do the login phase
        await doLogin(username, state.database, handleUpdate)
      }
  
     const setLocalVideoRef = ref => {
        localVideoRef = ref;
      }
  
    const  setRemoteVideoRef = ref => {
        remoteVideoRef = ref;
      }
  
    const handleUpdate = (notif, username) => {
        // read the received notif and apply it
        const { localConnection, database, localStream } = state
        if (notif){
            switch(notif.type){
                case 'offer':
                    //listen to the connection events 
                    setState({
                      ...state,
                      connectedUser: notif.from
                    })
                    //send an answer
                    listenToConnectionEvents(localConnection, username, notif.from, database, remoteVideoRef, doCandidate)

                  sendAnswer(localConnection, localStream, notif, doAnswer, database, username)
                    break;
                case 'answer':
                    //start the call 
                    setState({
                      ...state,
                      connectedUser: notif.from
                    })
                    startCall(localConnection, notif)
                    break;
                case 'candidate':
                    //add candidate to the connection
                    addCandidate(localConnection, notif)
                    break;
                default:
                    break;    
            }
        }
      }
    return(
        <VideoChat
        startCall={startCall}
        onLogin={onLogin}
        componentDidMount={componentDidMount}
        setLocalVideoRef={setLocalVideoRef}
        setRemoteVideoRef={setRemoteVideoRef}
        connectedUser={state.connectedUser}
      />
    )
}

export default Video;

