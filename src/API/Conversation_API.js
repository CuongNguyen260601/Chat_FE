import API_CALLER from './API_CALLER';

export const getConversationByUser = (userId)=>{
    return API_CALLER(`conversation/${userId}`,'GET');
}

export const coutConversationNotSeenByUser = (userId)=>{
    return API_CALLER(`conversation/count/${userId}`,'GET');
}

export const deleteConversation = (conversationId)=>{
    return API_CALLER(`conversation/delete/${conversationId}`, 'PUT');
}

export const getConversationById = (conversationId)=>{
    return API_CALLER(`conversation/getConversationById/${conversationId}`, 'GET');
}