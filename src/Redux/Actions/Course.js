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
    let courseData = [];
    let quizData = [];
    let midtermData = [];
    let examData = [];
    let projectData = [];
    let assignmentData = [];
    totarr = [];
    //console.log(payload)
    payload.map((courses) => {
      //console.log(courses.course)
      totAssignmentNum = totAssignmentNum + courses.course.assignments.length;
      totMidtermNum = totMidtermNum + courses.course.midterms.length;
      totExamNum = totExamNum + courses.course.exams.length;
      totProjNum = totProjNum + courses.course.projects.length;
      totQuizNum = totQuizNum + courses.course.quizes.length;
      courseData = [...courseData, courses.course];
      courses.course.exams.map((exam) => {
        examData = [...examData, exam];
        totarr = [...totarr, exam];
      });
      courses.course.midterms.map((midterm) => {
        midtermData = [...midtermData, midterm];
        totarr = [...totarr, midterm];
      });

      courses.course.assignments.map((assignment) => {
        assignmentData = [...assignmentData, assignment];
        totarr = [...totarr, assignment];
      });
      courses.course.projects.map((project) => {
        projectData = [...projectData, project];
        totarr = [...totarr, project];
      });
      courses.course.quizes.map((quiz) => {
        quizData = [...quizData, quiz];
        totarr = [...totarr, quiz];
      });

      /*
      console.log(examData[0]);
      console.log(midtermData);
      console.log(quizData);
      console.log(projectData);
      console.log(assignmentData);*/
      //console.log(courseData);
    });

    //console.log(totarr);
    dispatch(setCourseData(courseData));
    dispatch(setExamData(examData));
    dispatch(setMidtermData(midtermData));
    dispatch(setQuizData(quizData));
    dispatch(setProjectData(projectData));
    dispatch(setAssignmentData(assignmentData));
    dispatch(dateArry('date'));
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
