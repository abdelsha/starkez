const INITIAL_STATE ={
    course:[]
};

const courseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_COURSE':
      return {
        ...state,
        course: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;