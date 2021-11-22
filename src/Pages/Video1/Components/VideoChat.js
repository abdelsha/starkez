import classnames from 'classnames'
import {useState, useEffect} from "react";
//import '../Video.module.css'
import { useSelector, useDispatch } from "react-redux";

function VideoChat(props){
    const [loaded, setLoaded] = useState("false");
    const userstat = useSelector((state) => {
    return state.userState.user;
  });
    const [state, setState]= useState({
      isLoggedIn: false,
      userToCall: "",
      username: "",
    })
    useEffect(()=>{
        //console.log(courseStat)
        if(userstat){
          setLoaded("true");
        }
        
      },[userstat]);

     const onLoginClicked = async () => {
        await props.onLogin(state.username)
        setState({
          ...state,
          isLoggedIn: true
        })
        props.componentDidMount();
      }
    
     const onStartCallClicked = () => {
        props.startCall(state.username, state.userToCall)
      }

     const renderVideos = () => {
        return <div className={classnames('videos', { active: state.isLoggedIn })}>
          <div>
            <label>{state.username}</label>
    
            <video ref={props.setLocalVideoRef} autoPlay playsInline></video>
          </div>
          <div>
            <label>{props.connectedUser}</label>
            <video ref={props.setRemoteVideoRef} autoPlay playsInline></video>
          </div>
    
        </div>
      }

      const renderForms = () => {
        return state.isLoggedIn
          ? <div key='a' className='form'>
            <label>Call to</label>
            <input value={state.userToCall} type="text" onChange={e => setState({ ...state, userToCall: e.target.value })} />
            {console.log(state)}
            <button onClick={onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>
    
          </div>
          : <div key='b' className='form'>
            <label>Type a name</label>
            <input value={state.username} type="text" onChange={e => setState({ ...state, username: e.target.value })} />
          {console.log(state)}
            <button onClick={onLoginClicked} id="login-btn" className="btn btn-primary">Login</button>
    
          </div>
      }

    return(
        <section id="container">
      {props.connectedUser ? null : renderForms()}

      {renderVideos()}

    </section>
    )
}

export default VideoChat;