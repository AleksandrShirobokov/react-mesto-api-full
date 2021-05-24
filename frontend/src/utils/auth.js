import api from '../utils/api';

export const BASE_URL = 'http://localhost:3000'; //  localhost:3000



 const getResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
    .then(getResponse)
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({password, email})
    })
    .then(getResponse)
    .then((res) => {
        if(res.token) {
            localStorage.setItem('token', res.token);
            api.updateHeaders();
            return res;
        }
    })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token}`
        }
    })
    .then((res) => {
        return res.json()
    })
}