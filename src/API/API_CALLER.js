import axios from 'axios'
import env from 'react-dotenv';

const API_URL = env.API_URL;

const API_CALLER = (endpoint, methods, body)=>{
    return axios({
        url: `${API_URL}/api/${endpoint}`,
        method: methods,
        data: body,
    })
}

export default API_CALLER;