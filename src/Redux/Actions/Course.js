import { auth, provider, storage } from '../../Firebase/Firebase';
import db from '../../Firebase/Firebase';

export const setCourse = (course) => ({
    type: 'SET_COURSE',
    payload: course,
});
export const setExamNumber = (examNumber) => ({
  type: 'SET_EXAMNUMBER',
  payload: examNumber,
});

export const setMidtermNumber= (midtermNumber) => ({
  type: 'SET_MIDTERMNUMBER',
  payload: midtermNumber,
});

export const setQuizNumber = (quizNumber) => ({
  type: 'SET_QUIZNUMBER',
  payload: quizNumber,
});

export const setAssignmentNumber =(assignmentNumber) => ({
  type: 'SET_ASSIGNMENTNUMBER',
  payload: assignmentNumber,
});

export const setProjectNumber = (projectNumber) => ({
  type: 'SET_PROJECTNUMBER',
  payload: projectNumber,
});

export const setCourseData = (course) => ({
  type: 'SET_COURSEDATA',
  payload: course,
});
export const setExamData = (examData) => ({
type: 'SET_EXAMDATA',
payload: examData,
});

export const setMidtermData= (midtermData) => ({
type: 'SET_MIDTERMDATA',
payload: midtermData,
});

export const setQuizData = (quizData) => ({
type: 'SET_QUIZDATA',
payload: quizData,
});

export const setAssignmentData =(assignmentData) => ({
type: 'SET_ASSIGNMENTDATA',
payload: assignmentData,
});

export const setProjectData = (projectData) => ({
type: 'SET_PROJECTDATA',
payload: projectData,
});

export function submitCourseInfo (payload) {
    return (dispatch) => {
        db.collection("User")
          .doc(`${payload.user.uid}`).
          collection("Course")
          .doc(`${payload.courseName}`)
          .set( {
            course: {
              courseName: payload.courseName,
              courseYear: payload.courseYear,
              dateAdded: payload.timestamp,
              courseStart: payload.courseStart,
              courseEnd: payload.courseEnd,
              midterms: payload.midterms,
              exams: payload.exams,
              quizes: payload.quizes,
              assignments: payload.assignments,
              projects: payload.projects,
              
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

export function getCoursesAPI(user) {
  return (dispatch) => {
      let payload;
      
      db.collection("User")
          .doc(`${user.uid}`).
          collection("Course")
      .onSnapshot((snapshot) => {
          payload= snapshot.docs.map((doc) => doc.data());
          
          dispatch(setCourse(payload));
      });
      
      
  };
}
export function updateCourseInfo(payload){
  return (dispatch) =>{
    payload.map((courses)=> {
      //console.log(courses.course)
      console.log(courses.course.assignments.length);
    })
  }
}