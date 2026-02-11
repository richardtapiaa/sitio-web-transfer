import axios from 'axios';


import { setLoading } from '../stores/loaderStore';

const api = axios.create({
    baseURL: import.meta.env.PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        setLoading(true);
        return config;
    },
    (error) => {
        setLoading(false);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        setLoading(false);
        return response;
    },
    (error) => {
        setLoading(false);
        return Promise.reject(error);
    }
);

export default api;
