export const setMenueBar = (trigger) => ({
    type: 'SET_MENUBAR',
    payload: trigger,
});

export const setMenuTab =(trigger) => ({
    type: 'SET_MENUTAB',
    payload: trigger,
})

export function switchMenu (current){
    return (dispatch) => {
    if (current=="true"){
        dispatch(setMenueBar("false"));
        
    }else{
        
        dispatch(setMenueBar("true"));
    }
}

}