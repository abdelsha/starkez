import { auth, provider, storage } from "../../Firebase/Firebase";
import db from "../../Firebase/Firebase";
import { getUserAuth } from "./UserState";

let totarr = [];
let arr = [];
let arr2 = [];

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

export const setCourseNumber = (courseNumber) => ({
  type: "SET_COURSENUMBER",
  payload: courseNumber,
});


//This is the completed numbers for the pie chart and data

export const setCompExamNumber = (examNumber) => ({
  type: "SET_COMPEXAMNUMBER",
  payload: examNumber,
});

export const setCompMidtermNumber = (midtermNumber) => ({
  type: "SET_COMPMIDTERMNUMBER",
  payload: midtermNumber,
});

export const setCompQuizNumber = (quizNumber) => ({
  type: "SET_COMPQUIZNUMBER",
  payload: quizNumber,
});

export const setCompAssignmentNumber = (assignmentNumber) => ({
  type: "SET_COMPASSIGNMENTNUMBER",
  payload: assignmentNumber,
});

export const setCompProjectNumber = (projectNumber) => ({
  type: "SET_COMPPROJECTNUMBER",
  payload: projectNumber,
});

export const setCompCourseNumber = (courseNumber) => ({
  type: "SET_COMPCOURSENUMBER",
  payload: courseNumber,
});


//This is the course data


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
export const setDeadlines = (deadlines) => ({
  type: "SET_DEADLINE",
  payload: deadlines,
});
export const setOrderedCourse = (course) => ({
  type: "SET_ORDEREDCOURSE",
  payload: course,
});
export function submitCourseInfo(payload,user) {
  return (dispatch) => {
    console.log(payload)
    db.collection("User")
      .doc(`${user.uid}`)
      .collection("Course")
      .doc(`${payload.courseName}`)
      .set(
        {
          timestamp: payload.timestamp,
          courseName: payload.courseName,
          courseDesc: payload.courseDesc,
          courseYear: payload.courseYear,
          courseStart: payload.courseStart,
          courseEnd: payload.courseEnd,
          status:payload.status
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
  return async (dispatch) => {
    let totCourseNum=0;
    let totCompCourseNum=0;
    let totAssignmentNum = 0;
    let totComAssignmentNum=0;
    let totMidtermNum = 0;
    let totCompMidtermNum=0;
    let totExamNum = 0;
    let totCompExamNum = 0;
    let totProjNum = 0;
    let totCompProjNum = 0;
    let totQuizNum = 0;
    let totCompQuizNum = 0;
    let courseData = [];
    let quizData = [];
    let midtermData = [];
    let examData = [];
    let projectData = [];
    let assignmentData = [];
    totarr = [];
    //console.log(payload)
    
    try{
      payload.map((courses) => {
        courses.status.map((value)=>{
          if (value.id.includes("midterm")){
            midtermData = [...midtermData, value];
            totarr = [...totarr, value];
            totMidtermNum+=1;
            if (value.complete){
              totCompMidtermNum+=1;
            }
            //console.log(value.id)
          }
          if (value.id.includes("exam")){
            examData = [...examData, value];
            totarr = [...totarr, value];
            totExamNum+=1;
            if (value.complete){
              totCompExamNum+=1;
            }
          }
          if (value.id.includes("quiz")){
            quizData = [...quizData, value];
            totarr = [...totarr, value];
            totQuizNum+=1;
            if (value.complete){
              totCompQuizNum+=1;
            }
          }
          if (value.id.includes("project")){
            projectData = [...projectData, value];
            totarr = [...totarr, value];
            totProjNum+=1;
            if (value.complete){
              totCompProjNum+=1;
            }
          }
          if (value.id.includes("assignment")){
            assignmentData = [...assignmentData, value];
            totarr = [...totarr, value];
            totAssignmentNum+=1;
            if (value.complete){
              totComAssignmentNum+=1;
            }
          }
          courseData = [...courseData, value];
          totCourseNum+=1;
          if (value.complete){
            totCompCourseNum+=1;
          }
        })
        //console.log(midtermData)
      })
        /*
        console.log(examData[0]);
        console.log(midtermData);
        console.log(quizData);
        console.log(projectData);
        console.log(assignmentData);*/
        //console.log(courseData);
      
    }catch (error){
      console.log(error)
    }
    

    //console.log(totarr);
    
    dispatch(setCourseData(courseData));
    dispatch(setExamData(examData));
    dispatch(setMidtermData(midtermData));
    dispatch(setQuizData(quizData));
    dispatch(setProjectData(projectData));
    dispatch(setAssignmentData(assignmentData));
    dispatch(dateArry('date'));
    dispatch(setExamNumber(totExamNum));
    dispatch(setCompExamNumber(totCompExamNum));
    dispatch(setMidtermNumber(totMidtermNum));
    dispatch(setCompMidtermNumber(totCompMidtermNum));
    dispatch(setQuizNumber(totQuizNum));
    dispatch(setCompQuizNumber(totCompQuizNum));
    dispatch(setAssignmentNumber(totAssignmentNum));
    dispatch(setCompAssignmentNumber(totComAssignmentNum));
    dispatch(setProjectNumber(totProjNum));
    dispatch(setCompProjectNumber(totCompProjNum));
    dispatch(setCourseNumber(totCourseNum));
    dispatch(setCompCourseNumber(totCompCourseNum));
    //console.log(examData)
  };
}

 const dateArry = (value) => {
  let temparr = [];
  let values=value;
  totarr.map((data, key) => {
    //console.log(data.date)
    //arr[key]=data.date.toDate();
    let today = new Date();
    arr[key] = data;
    //console.log(data)
    if (data.date.toDate() >= today) {
      temparr[key] = data;
      //console.log(arr)
    }

    //console.log(data.date.toDate())
  });
  //console.log(value)
  let filtered = temparr.filter(function (el) {
    return el != null;
  });
  arr2 = filtered;
  return (dispatch) => {
    //console.log(values)
    let sortArrFilt = quickSortHelper(arr2, 0, arr2.length - 1,values);
    let sortArr = quickSortHelper(arr, 0, arr.length - 1,values);
    //console.log(sortArr)
    dispatch(setDeadlines(sortArrFilt));
    dispatch(setOrderedCourse(sortArr));
  };

  //console.log(ordarr)
};

const quickSortHelper = (array, startIdx, endIdx,value) => {
  //console.log(array[startIdx].date.toDate())
  if (startIdx >= endIdx) {
    return;
  }
  let pivotIdx = startIdx;
  let left = startIdx + 1;
  let right = endIdx;
  
  let cus=array[left];
  
  //console.log(array[left] > array[pivotIdx] && array[right]<array[pivotIdx])

  while (right >= left) {
    if (
      array[left][value].toDate() > array[pivotIdx][value].toDate() &&
      array[right][value].toDate() < array[pivotIdx][value].toDate()
    ) {
      [array[left], array[right]] = [array[right], array[left]];
      //console.log("if1")
      //console.log(array);
    }
    if (array[left][value].toDate() <= array[pivotIdx][value].toDate()) {
      left += 1;
      //console.log("if2")
      //console.log(array);
    }
    if (array[right][value].toDate() >= array[pivotIdx][value].toDate()) {
      right -= 1;
      //console.log("if3")
      //console.log(array);
    }

    //console.log(array);
  }
  [array[pivotIdx], array[right]] = [array[right], array[pivotIdx]];

  let leftSubArraySmaller = right - 1 - startIdx < endIdx - (right + 1);
  if (leftSubArraySmaller) {
    quickSortHelper(array, startIdx, right - 1,value);
    quickSortHelper(array, right + 1, endIdx,value);
  } else {
    quickSortHelper(array, right + 1, endIdx,value);
    quickSortHelper(array, startIdx, right - 1,value);
  }
  return array;
};

export const quickSort = (array,value) =>{
  let sortedArr = quickSortHelper2(array, 0, array.length - 1,value);
  return sortedArr;
};

const quickSortHelper2 = (array, startIdx, endIdx,value)=>{
  //console.log(array[startIdx].date.toDate())
  if (startIdx >= endIdx) {
    return;
  }
  let pivotIdx = startIdx;
  let left = startIdx + 1;
  let right = endIdx;
  
  
  
  //console.log(array[left] > array[pivotIdx] && array[right]<array[pivotIdx])

  while (right >= left) {
    if (
      array[left][value] > array[pivotIdx][value] &&
      array[right][value] < array[pivotIdx][value]
    ) {
      [array[left], array[right]] = [array[right], array[left]];
      //console.log("if1")
      //console.log(array);
    }
    if (array[left][value] <= array[pivotIdx][value]) {
      left += 1;
      //console.log("if2")
      //console.log(array);
    }
    if (array[right][value] >= array[pivotIdx][value]) {
      right -= 1;
      //console.log("if3")
      //console.log(array);
    }

    //console.log(array);
  }
  [array[pivotIdx], array[right]] = [array[right], array[pivotIdx]];

  let leftSubArraySmaller = right - 1 - startIdx < endIdx - (right + 1);
  if (leftSubArraySmaller) {
    quickSortHelper2(array, startIdx, right - 1,value);
    quickSortHelper2(array, right + 1, endIdx,value);
  } else {
    quickSortHelper2(array, right + 1, endIdx,value);
    quickSortHelper2(array, startIdx, right - 1,value);
  }
  return array;
};

export async function updateCoursesAPI(user, courseName, stat, val) {
  let lists = [];
  
    console.log(courseName);
    //console.log(stat);
    //console.log(user);
    await db.collection("User")
      .doc(`${user.uid}`)
      .collection("Course")
      .doc(courseName)
      .get()
      .then((snapshot) => {
        //payload = snapshot.docs.map((doc) => doc.data());
        
        snapshot.data().status.map((values, key) => {
          //console.log(stat.id)
          if (values.id == stat.id) {
            values.complete = val;
            lists = [...lists, values];
            //console.log(lists)
          } else {
            lists = [...lists, values];
          }
        })
        //console.log(lists)
      })
      
      
      await db.collection("User")
          .doc(`${user.uid}`)
          .collection("Course")
          .doc(`${courseName}`)
          .update({
            
              status: lists,
            
          }).then((doc)=>{
            
          })
        //console.log(lists)
          
        
        
      
  };
