import { auth, provider, storage } from '../../Firebase/Firebase';
import db from '../../Firebase/Firebase';

export const setCourse = (course) => ({
    type: 'SET_COURSE',
    payload: course,
});

export function submitCourseInfo (payload) {
    return (dispatch) => {
        db.collection("User")
          .doc(`${payload.user.uid}`)
          .get()
          .then((prevData) => {
            const ids= prevData.docs.map((doc)=>doc.data());
            console.log(ids);
            console.log(payload.user.uid)
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
          })

          .catch((err) => {
            console.log(err);
          });
    }
}