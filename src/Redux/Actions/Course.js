import { auth, provider, storage } from "../../Firebase/Firebase";
import db from "../../Firebase/Firebase";
import { getUserAuth } from "./UserState";

export const setCourse = (course) => ({
  type: "SET_COURSE",
  payload: course,
});
export const setExamNumber = (examNumber) => ({
  type: "SET_EXAMNUMBER",
  payload: examNumber,
});

export const setMidtermNumber = (midtermNumber) => ({
  type: "SET_MIDTERMNUMBER",
  payload: midtermNumber,
});

export const setQuizNumber = (quizNumber) => ({
  type: "SET_QUIZNUMBER",
  payload: quizNumber,
});

export const setAssignmentNumber = (assignmentNumber) => ({
  type: "SET_ASSIGNMENTNUMBER",
  payload: assignmentNumber,
});

export const setProjectNumber = (projectNumber) => ({
  type: "SET_PROJECTNUMBER",
  payload: projectNumber,
});

export const setCourseData = (course) => ({
  type: "SET_COURSEDATA",
  payload: course,
});
export const setExamData = (examData) => ({
  type: "SET_EXAMDATA",
  payload: examData,
});

export const setMidtermData = (midtermData) => ({
  type: "SET_MIDTERMDATA",
  payload: midtermData,
});

export const setQuizData = (quizData) => ({
  type: "SET_QUIZDATA",
  payload: quizData,
});

export const setAssignmentData = (assignmentData) => ({
  type: "SET_ASSIGNMENTDATA",
  payload: assignmentData,
});

export const setProjectData = (projectData) => ({
  type: "SET_PROJECTDATA",
  payload: projectData,
});

export function submitCourseInfo(payload) {
  return (dispatch) => {
    db.collection("User")
      .doc(`${payload.user.uid}`)
      .collection("Course")
      .doc(`${payload.courseName}`)
      .set(
        {
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
        },
        { merge: true }
      );

    {
      /*db.collection("User")
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
              });*/
    }
  };
}

export function getCoursesAPI(user) {
  return (dispatch) => {
    let payload;

    //console.log(user);
    db.collection("User")
      .doc(`${user.uid}`)
      .collection("Course")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());

        dispatch(setCourse(payload));
      });
  };
}
export function UpdateCourseInfo(payload) {
  return (dispatch) => {
    let totAssignmentNum = 0;
    let totMidtermNum = 0;
    let totExamNum = 0;
    let totProjNum = 0;
    let totQuizNum = 0;
    let courseData=[];
    let quizData = [];
    let midtermData = [];
    let examData = [];
    let projectData = [];
    let assignmentData = [];

    payload.map((courses) => {
      //console.log(courses.course)
      totAssignmentNum = totAssignmentNum + courses.course.assignments.length;
      totMidtermNum = totMidtermNum + courses.course.midterms.length;
      totExamNum = totExamNum + courses.course.exams.length;
      totProjNum = totProjNum + courses.course.projects.length;
      totQuizNum = totQuizNum + courses.course.quizes.length;
      courseData = [...courseData, courses.course]
      courses.course.exams.map((exam)=>{
        examData = [...examData, 
        
          exam,
        
      ];
      })
      courses.course.midterms.map((midterm)=>{
        midtermData = [...midtermData, 
        
          midterm,
         
        ];
      })
      
      courses.course.assignments.map((assignment)=>{
        assignmentData = [...assignmentData, 
        
          assignment,
       
     ];
      })
     courses.course.projects.map((project)=>{
      projectData = [...projectData, 
        
        project,
     
   ];
     })
      courses.course.quizes.map((quiz)=>{
        quizData = [...quizData,
        
          quiz,
       
      ];
      })
      
      /*
      console.log(examData[0]);
      console.log(midtermData);
      console.log(quizData);
      console.log(projectData);
      console.log(assignmentData);*/
      //console.log(courseData);
    });
    dispatch(setCourseData(courseData));
    dispatch(setExamData(examData));
    dispatch(setMidtermData(midtermData));
    dispatch(setQuizData(quizData));
    dispatch(setProjectData(projectData));
    dispatch(setAssignmentData(assignmentData));
    //console.log(examData)
    
  };
}
