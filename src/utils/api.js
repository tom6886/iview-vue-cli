import axios from 'axios'
import {getStore, removeStore} from './storage';
import Cookies from 'js-cookie';
import {router} from '@/router/index';
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 后端开发调试用配置
axios.defaults.baseURL = 'http://localhost:8098/mos-security/'
// 测试地址部署用配置
// axios.defaults.baseURL = 'http://172.16.0.127:8098/mos-security/'

// 请求发送时带上token
axios.interceptors.request.use(config => {
    let token = getStore('accessToken');
    console.log('token=' + token)
    if (token) {
        config.headers = {
            'token': token
        };
    }
    return config;
}, (error) => {
    return Promise.reject(error)
});

// 返回状态判断
axios.interceptors.response.use((res) => {
    if (res.status === 200) {
        return res
    }

    if (res.status === 401) {
        Cookies.remove('userInfo');
        removeStore("accessToken");
        removeStore("vuex");

        router.push({
            name: 'login'
        });
    }

    return Promise.reject(res)
}, (error) => {
    return Promise.reject(error)
})

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    login(user) {
        return fetch('/app/login', user)
    },
    menu() {
        return fetch('sys/menu/navs')
    }
}
