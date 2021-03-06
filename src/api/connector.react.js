import axios from 'axios';
import { BACKEND_URL } from '../constants';
import store from "../store";

const base_api = axios.create({
    baseURL: BACKEND_URL,
    headers:{ 'Content-Type': 'application/json'}
});

const api = {
    ql: (query, additional_data = null, config = null) => {
        return base_api.post('/graphql', {
                ...additional_data,
                query: query,
            },
            {
                ...config,
                transformResponse: [function (data) {
                    return JSON.parse(data).data;
                }]
            }
        )
    },
    post: base_api.post,
    delete: base_api.delete,
    get: base_api.get,
    put: base_api.put,
    simple_get: axios.get,
    simple_post: axios.post
}

function getJwt(){
    try {
        return store.getState().auth.jwt;
    }catch (e) {
        return null;
    }
}

export {
    base_api,
    api,
    getJwt
}

export default api;