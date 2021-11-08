import { auth, provider, storage } from "../../Firebase/Firebase";
import db from "../../Firebase/Firebase";

//Action:
const email = "amrshakour97@gmail.com";

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const setUserOnline = (onlineUser)=>({
  type: "SET_ONLINE_USER",
  payload: onlineUser,
})

export const getRealTimeMessage =(message)=>({
  type: "GET_REALTIME_MESSAGE",
  payload:message,
})

export function getOnlineUsers(){

  return async (dispatch)=>{
    let onlineuser=[];
    try{
      let authen=await auth.currentUser.uid;
      console.log(authen)
      db.collection("User")
      .onSnapshot((querySnapshot)=>{
        
        const users=[];
        querySnapshot.forEach(function(doc){
          
          if(doc.data().UID != authen){
            users.push(doc.data());
          }
        });
        console.log(users)
        dispatch(setUserOnline(users));
      })
    }catch(err){
      
    }
    
    
    
  }
    
  
}

export function signInWithGoogleApi() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then(async (payload) => {
        //console.log(payload.user);

        db.collection("User")
          .doc(`${payload.user.uid}`)
          .get()
          .then((doc) => {
            if (doc.data()) {
              //console.log(payload.user);
              dispatch(setUser(payload.user));
            } else {
              console.log("data doesnt exist");
              db.collection("User").doc(`${payload.user.uid}`).set({
                UID: payload.user.uid,
                isOnline:true,
                displayName: payload.user.displayName,
                sharedImg:payload.user.photoURL
              });
              dispatch(setUser(payload.user));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        db.collection("User").doc(`${user.uid}`).set({
          
          isOnline:true,
        },{ merge: true });
        dispatch(setUser(user));
      } else {
        
        dispatch(setUser(null));
      }
    });
  };
}

export function signOutApi() {
  return (dispatch) => {

    let uid = auth.currentUser.uid;
    //console.log(auth)
    db.collection("User").doc(`${uid}`).set({
      
      isOnline:false,
    },{ merge: true })
    .then(()=>{
      auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });

    })
    
  };
}

export function signInWithUsername(email, password) {
  return async (dispatch) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        console.log(userCredential);
        dispatch(setUser(userCredential.user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorCode);
        //console.log(errorMessage);
        alert(`${errorCode}: Please Create an Account `);
        dispatch(setUser(null));
        
      });
  };
}

export function createAccountWithhUserName(email, password,payload) {
  return (dispatch) => {
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const currentUser = auth.currentUser;
          const name= payload.displayName;
          currentUser.updateProfile({
          displayName:name
        })
        .then(()=>{
          db.collection("User").doc(`${userCredential.user.uid}`).set({
            UID: userCredential.user.uid,
            isOnline:true,
          });
          //console.log(userCredential.user);
          dispatch(setUser(userCredential.user));
        })
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          dispatch(setUser(null));
          console.log(`${errorMessage} `);
          console.log(errorCode)
        });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
}

export async function sendPasswordResetEmail(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("password reset link sent!");
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}
export function updateUserInfo(payload, objPayload) {
  return (dispatch) => {
    const name= `${payload.firstName} ${payload.lastName}`;
    //console.log(objPayload.image);
    if (objPayload.image != "") {
      const upload = storage
        .ref(`images/${objPayload.image.name}`)
        .put(objPayload.image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          //console.log(`progress: ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`progress: ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          const currUser= auth.currentUser;
          currUser.updateProfile({
            photoURL:downloadURL,
          })
          .then(()=>{
            console.log(downloadURL);
          db.collection("User")
            .doc(`${objPayload.user.uid}`)
            .collection("UserInfo")
            .doc(`${objPayload.user.displayName}`)
            .set(
              {
                user: objPayload.user.displayName,
                info: payload,
                
                sharedImg: downloadURL,
              },

              { merge: true }
            )
            .then(()=>{
              //console.log("here")
              db.collection("User")
            .doc(`${objPayload.user.uid}`).set({
              firstName:payload.firstName,
              lastName:payload.lastName,
              fullName:name,
              sharedImg: downloadURL,
            },{ merge: true })
            .then(()=>{
              //console.log("done")
            })
            })
          })
          
        }
      );
    } else {
      db.collection("User")
        .doc(`${objPayload.user.uid}`)
        .collection("UserInfo")
        .doc(`${objPayload.user.displayName}`)
        .set(
          { user: objPayload.user.displayName, info: payload },

          { merge: true }
        )
        .then(()=>{
          //console.log("here")
          db.collection("User")
        .doc(`${objPayload.user.uid}`).set({
          firstName:payload.firstName,
          lastName:payload.lastName,
          fullName:name,
        },{ merge: true })
        .then(()=>{
          //console.log("done")
        })
        })
    }
  };
}

export const updateMessate = (messobj,userUid)=>{
  return async (dispatch)=>{
    db.collection("User")
        .doc(`${auth.currentUser.uid}`)
        .collection("conversations")
        .add({
          ...messobj,
          isView: false,
          createdAt: new Date()
        })
        .then(()=>{
        db.collection("User")
        .doc(`${userUid}`)
        .collection("conversations")
        .add({
          ...messobj,
          isView: false,
          createdAt: new Date()
        })
        .then((data)=>{})
          //dispatch(getRealTimeMessage())
        })
        .catch((error)=>{
          console.log(error)
        })
  }
}

export const getRealTimeConversations=(user)=>{
  return async (dispatch)=>{

    db.collection("User")
    .doc(`${auth.currentUser.uid}`)
    .collection("conversations")
    .where('user_uid_1','in',[user.uid_1, user.uid_2])
    .orderBy('createdAt', 'asc')
    .onSnapshot((querySnapshot)=>{
      const conversations=[];
      querySnapshot.forEach(doc=>{
        //console.log(doc.data())
        if(
          (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
          ||(doc.data().user_uid_1==user.uid_2 &&doc.data().user_uid_2 == user.uid_1)
          ){
            conversations.push(doc.data())
        }
        if(conversations.length>0){
          dispatch(getRealTimeMessage({conversations}))
        }
        
      })
      console.log(conversations)
    })
  }
}