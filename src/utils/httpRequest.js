import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

// httpRequest.interceptors.response.use(function (response) {
//     // Optional: Do something with response data
//     return response;
// }, function (error) {
//     // Do whatever you want with the response error here:

//     // But, be SURE to return the rejected promise, so the caller still has 
//     // the option of additional specialized handling at the call-site:
//     return Promise.reject(error);
// });

export const get = async (path, params = {}) => {
    const response = await httpRequest.get(path, params);
    return response;
};

export const post = async (path, data = {}, params = {}) => {
    const response = await httpRequest.post(path, data, params)
    return response;
};

export default httpRequest;