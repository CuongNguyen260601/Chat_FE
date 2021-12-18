import API_CALLER from './API_CALLER';

export const uploadImage = (file) => {
    return API_CALLER('upload', 'POST', file);
} 