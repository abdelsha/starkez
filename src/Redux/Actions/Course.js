import { auth, provider, storage } from '../../Firebase/Firebase';
import db from '../../Firebase/Firebase';

export const setCourse = (course) => ({
    type: 'SET_COURSE',
    payload: course,
});

export function submitCourseInfo (payload) {
    return (dispatch) => {
        db.collection("User")
          .doc(`${payload.user.uid}`).
          collection("Course")
          .doc(`${payload.courseName}`)
          .set( {
            course: {
              date: payload.timestamp,
              courseStart: payload.courseStart,
              courseEnd: payload.courseEnd,
              midtermone: payload.midtermone,
              midtermtwo: payload.midtermtwo,
              midtermthree: payload.midtermthree,
              exam: payload.exam,
              midtermoneText: payload.midtermoneText,
              midtermtwoText: payload.midtermtwoText,
              courseYear: payload.courseYear
            },
          }, {merge:true})
          
            {/*db.collection("User")
              .doc(`${payload.user.uid}`)
              .set({
                
                course: {
                  date: payload.timestamp,
                  courseStart: payload.courseStart,
                  courseEnd: payload.courseEnd,
                  midtermone: payload.midtermone,
                  midtermtwo: payload.midtermtwo,
                  midtermthree: payload.midtermthree,
                  exam: payload.exam,
                  midtermoneText: payload.midtermoneText,
                  midtermtwoText: payload.midtermtwoText,
                  midtermthreeText: payload.midtermthreeText,
                },
              });*/}
          

          
    }
}