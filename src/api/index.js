import axios from 'axios'
import store from "../store";

const baseUrl = process.env.VUE_APP_BASE_URL;

export const apiAxios = axios.create({
    baseURL: `${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json',
        },
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    },
    responseType: "json",
})

apiAxios.interceptors.request.use(config => {
    let token = store.state.auth.accessToken
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

export default {
    login(data) {
        return apiAxios({
            method: 'post',
            url: '/admin/login',
            data: data
        })
    },
    dashboard() {
        return apiAxios({
            method: 'get',
            url: '/admin/dashboard'
        })
    },
    getPosts(data) {
        return apiAxios({
            method: 'get',
            url: '/posts',
            params: data
        })
    }
}
