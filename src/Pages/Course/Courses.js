import React from "react";
import {useSelector, useDispatch} from 'react-redux';

function CoursePage() {
    const userstat = useSelector((state)=>{
        return state.userState.user;
      });
    const courseStat= useSelector((state) =>{
        return state.courseState.course;
    })

      const dispatch = useDispatch();
    return (
        <div>
            Course
        </div>
    )
}

export default CoursePage;