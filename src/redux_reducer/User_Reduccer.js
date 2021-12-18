const User_Init = {
    sender: {
        _id:'',
        nameUser:'',
        imageUser:'',
        ageUser:'',
        emailUser:'',
        password:'',
        isAdmin:false,
        createdAt:'',
        updatedAt:'',
    },
    listUserOnline:[],
    listUserInRoom:[],
}

const User_Reducer = (state = User_Init, action)=>{
    switch(action.type){
        case 'SET_SENDER':{
            const newState = {
                ...state,
                sender: action.payload,
            }
            return newState;
        }
        case 'SET_LIST_USER_ONLINE':{
            const newState = {
                ...state,
                listUserOnline: action.payload,
            }
            return newState;
        }
        case 'SET_LIST_USER_IN_ROOM':{
            const newState = {
                ...state,
                listUserInRoom: action.payload,
            }
            return newState;
        }
        default:{
            return state;
        }
    }
}

export default User_Reducer;