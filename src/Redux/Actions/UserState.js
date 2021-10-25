import { auth, provider, storage } from '../../Firebase/Firebase';
import db from '../../Firebase/Firebase';

//Action:
const email= "amrshakour97@gmail.com";


export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

 

export function signInWithGoogleApi() {
    return (dispatch) => {
        auth.signInWithPopup(provider)
        .then(async (payload)=>{
            //console.log(payload.user);
            
            
            db.collection('User')
            .doc(`${payload.user.uid}`)
            .get()
            .then( (doc) => {
                if (doc.data()){
                    console.log(payload.user);
                    dispatch(setUser(payload.user));
                }
                else{
                    console.log('data doesnt exist');
                    db.collection('User').doc(`${payload.user.uid}`).set({
                        UID: payload.user.uid,
                    });
                    dispatch(setUser(payload.user));
                }
            }).catch ((err)=>{console.log(err)}) ;

            
            
            

           
                
            
            
        })
        .catch( (error) => alert(error.message));
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                //console.log(user);
                dispatch(setUser(user));
            }else{
                dispatch(setUser(null));
            }

        });
    }
}

export function signOutApi() {
    return (dispatch) => {
        auth.signOut().then( () => {
            dispatch(setUser(null));
        }).catch((error) => {
            console.log(error.message);
        });
    };
}

export function signInWithUsername (email, password) {
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
        .then( async (userCredential) => {
            console.log(userCredential);
            dispatch(setUser(userCredential.user));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.log(errorCode);
            //console.log(errorMessage);
            dispatch(setUser(null));
            alert(`${errorCode}: Please Create an Account `);
          });
          
    }
}

export function createAccountWithhUserName ( email, password) {
  return (dispatch) => {
    try {
        auth.createUserWithEmailAndPassword
          (email, password)
          .then(async (userCredential) => {
            db.collection("User").doc(`${userCredential.user.uid}`).set ({
                UID: userCredential.user.uid,
            })
            console.log(userCredential.user);
            dispatch(setUser(userCredential.user));
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch(setUser(null));
            alert(`${errorMessage} `);
         
          })
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
  }
    
}

export async function sendPasswordResetEmail (email) {
    try{
        await auth.sendPasswordResetEmail(email);
        alert('password reset link sent!')
    }catch(err){
        console.log(err);
        alert(err.message);
    }
}
export function updateUserInfo (payload) {
    return (dispatch)=> {
        db.collection("User")
          .doc(`${payload.user.uid}`).
          collection("UserInfo").doc(`${payload.user.displayName}`).set({
            user: payload.user.displayName,
            time:payload.timestamp,
            firstName:payload.firstName,
            lastName:payload.lastName,
            email: payload.email
          }
          )
    }
}

    