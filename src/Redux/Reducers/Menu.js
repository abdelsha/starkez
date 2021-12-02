const INITIAL_STATE ={
    menuBar:true,
    menuTab: false,
}

const menuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_MENUBAR':
        return {
          menuBar: action.payload,
        };
        case 'SET_MENUTAB':
        return {
          menuTab: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default menuReducer;