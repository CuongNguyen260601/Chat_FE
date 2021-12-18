const Message_Init = {
    conversation:{
        _id:'',
        members: [],
        isSeen:false,
        isDelete: false,    
        createdAt:'',
        updatedAt:'',
    },
    receiver:{
        _id:'',
        nameUser:'',
        imageUser:'',
        emailUser:'',
        password:'',
        isAdmin:false,
        createdAt:'',
        updatedAt:'',
    },
    listMessage:[]
}

const Message_Reducer = (state = Message_Init, action)=>{
    switch(action.type){
        case 'SET_CONVERSATION':{
            const newState = {
                ...state,
                conversation: action.payload,
            }
            return newState;
        }
        case 'SET_RECEIVER':{
            const newState = {
                ...state,
                receiver: action.payload,
            }
            return newState;
        }
        case 'SET_LIST_MESSAGE':{
            const newState = {
                ...state,
                listMessage: action.payload,
            }
            return newState;
        }
        default:{
            return state;
        }
    }
}

export default Message_Reducer;