const Conversation_Init = {
    listConversation: [],
}

const Conversation_Reducer = (state = Conversation_Init, action)=>{
    switch(action.type){
        case 'SET_LIST_CONVERSATION':{
            const newState = {
                ...state,
                listConversation: action.payload
            }
            return newState;
        }
        default:{
            return state;
        }
    }
}

export default Conversation_Reducer;