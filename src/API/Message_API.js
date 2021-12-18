import API_CALLER from './API_CALLER';

export const countMessageNotSeen = (userId, conversationId)=>{
    return API_CALLER(`message/count/${userId}/${conversationId}`,'GET');
}

export const sendMessage = (data)=>{
    return API_CALLER('message/sendMessage','POST',data);
}

export const updateMessage = (conversationId)=>{
    return API_CALLER(`message/updateMessage/${conversationId}`,'PUT');
}

export const getLastMessage = (conversationId)=>{
    return API_CALLER(`message/getMessageLast/${conversationId}`,'GET');
}

export const getListMessage = (conversationId,userId,page)=>{
    return API_CALLER(`message/${conversationId}/${userId}/${page}`,'GET');
}

export const updateMessageTemplate = (data)=>{
    return API_CALLER('message/updateTemplate','POST',data);
}

export const sendImage = (data)=>{
    return API_CALLER('upload','POST',data);
}