export const setConversation = (conversation) =>{
    return {
        type: 'SET_CONVERSATION',
        payload: conversation
    }
}

export const setReceiver = (receiver) =>{
    return {
        type: 'SET_RECEIVER',
        payload: receiver
    }
}

export const setListMessage = (listMessage) =>{
    return {
        type: 'SET_LIST_MESSAGE',
        payload: listMessage
    }
}