const INITIAL_STATE = {
  course: [],
  examNumber: "",
  midtermNumber: "",
  quizNumber: "",
  assignmentNumber: "",
  projectNumber: "",
  courseData:[{id: "",date: "",desc: "",},],
  examData:[{id: "",date: "",desc: "",},],
  midtermData: [{id: "",date: "",desc: "",},],
  quizData: [{id: "",date: "",desc: "",},],
  assignmentData: [{id: "",date: "",desc: "",},],
  projectData: [{id: "",date: "",desc: "",},],
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_COURSE":
      return {
        ...state,
        course: action.payload,
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
