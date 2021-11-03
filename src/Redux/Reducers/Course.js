const INITIAL_STATE = {
  courses: [],
  deadlines: [{ id: "", date: "", desc: "" }],
  orderdCourse: [{ id: "", date: "", desc: "" }],
  courseNumer: 0,
  compCourseNumber: 0,
  examNumber: 0,
  compExamNumber: 0,
  midtermNumber:0,
  compMidtermNumber: 0,
  quizNumber: 0,
  compQuizNumber: 0,
  assignmentNumber: 0,
  compAssignmentNumber: 0,
  projectNumber: 0,
  compProjectNumber: 0,
  courseData: [{ id: "", date: "", desc: "" }],
  examData: [{ id: "", date: "", desc: "" }],
  midtermData: [{ id: "", date: "", desc: "" }],
  quizData: [{ id: "", date: "", desc: "" }],
  assignmentData: [{ id: "", date: "", desc: "" }],
  projectData: [{ id: "", date: "", desc: "" }],
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_COURSE":
      return {
        ...state,
        courses: action.payload,
      };
    case "SET_DEADLINE":
      return {
        ...state,
        deadlines: action.payload,
      };
    case "SET_ORDEREDCOURSE":
      return {
        ...state,
        orderdCourse: action.payload,
      };
    case "SET_EXAMNUMBER":
      return {
        ...state,
        examNumber: action.payload,
      };
    case "SET_MIDTERMNUMBER":
      return {
        ...state,
        midtermNumber: action.payload,
      };
    case "SET_QUIZNUMBER":
      return {
        ...state,
        quizNumber: action.payload,
      };
    case "SET_ASSIGNMENTNUMBER":
      return {
        ...state,
        assignmentNumber: action.payload,
      };
    case "SET_PROJECTNUMBER":
      return {
        ...state,
        projectNumber: action.payload,
      };
    case "SET_COURSENUMBER":
      return {
        ...state,
        courseNumber: action.payload,
      };
    case "SET_COMPCOURSENUMBER":
      return {
        ...state,
        compCxamNumber: action.payload,
      };
    case "SET_COMPEXAMNUMBER":
      return {
        ...state,
        compExamNumber: action.payload,
      };
    case "SET_COMPMIDTERMNUMBER":
      return {
        ...state,
        compMidtermNumber: action.payload,
      };

    case "SET_COMPQUIZNUMBER":
      return {
        ...state,
        compQuizNumber: action.payload,
      };
    case "SET_COMPASSIGNMENTNUMBER":
      return {
        ...state,
        compAssignmentNumber: action.payload,
      };
    case "SET_COMPPROJECTNUMBER":
      return {
        ...state,
        compProjectNumber: action.payload,
      };
    case "SET_COURSEDATA":
      return {
        ...state,
        courseData: action.payload,
      };
    case "SET_EXAMDATA":
      return {
        ...state,
        examData: action.payload,
      };
    case "SET_MIDTERMDATA":
      return {
        ...state,
        midtermData: action.payload,
      };
    case "SET_QUIZDATA":
      return {
        ...state,
        quizData: action.payload,
      };
    case "SET_ASSIGNMENTDATA":
      return {
        ...state,
        assignmentData: action.payload,
      };
    case "SET_PROJECTDATA":
      return {
        ...state,
        projectData: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
