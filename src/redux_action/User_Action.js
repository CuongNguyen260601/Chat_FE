export const setSender = (sender)=>{
    return {
        type: 'SET_SENDER',
        payload: sender,
    }
};

export const setListUserOnline = (listUserOnline)=>{
    return {
        type: 'SET_LIST_USER_ONLINE',
        payload: listUserOnline,
    }
}

export const setListUserInRoom = (listUserInRoom)=>{
    return {
        type: 'SET_LIST_USER_IN_ROOM',
        payload: listUserInRoom,
    }
}