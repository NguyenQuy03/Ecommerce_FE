import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export const post = async (path, data = {}, options = {}) => {
    try {
        const response = httpRequest.post(path, data, options)
        return response;
    } catch (error) {
        // console.error(`POST request to ${path} failed:`, error);
        // throw error; // rethrow the error so that it can be caught by the calling function
        return error;
    }
};

export default httpRequest;