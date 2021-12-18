import API_CALLER from './API_CALLER';

export const login = (data)=>{
    return API_CALLER('user/login','POST',data);
}

export const register = (data)=>{
    return API_CALLER('user/newUser','POST',data);
}

export const getUserById = (userId)=>{
    return API_CALLER(`user/${userId}`,'GET');
}

export const getAdmin = ()=>{
    return API_CALLER(`user/getAdmin`,'GET');
}

export const updateUser = (data,userId)=>{
    return API_CALLER(`user/updateUser/${userId}`,'PUT',data);
}