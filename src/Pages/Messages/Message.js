import React from "react";
import {useSelector, useDispatch} from 'react-redux';

function MessagePage() {
    const userstat = useSelector((state)=>{
        return state.userState.user;
      });
    const courseStat= useSelector((state) =>{
        return state.courseState.course;
    })

      const dispatch = useDispatch();
    return (
        <div>
            Messages
        </div>
    )
}

export default MessagePage;