
import api from "../utils/api";

//  localhost:3000
/* export const BASE_URL = 'http://localhost:3000'; */
export const BASE_URL = 'https://api.krasavchik.students.nomoredomains.monster'; //  localhost:3000

 const getResponse = (res) => {
    if(!res.ok) {
        return Promise.reject(res.status);
    }
    return res.json();
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
    .then((data) => {
        if(data.token) {   
            localStorage.setItem('token', data.token);
            api.updateToken(); 
            return data;
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
    .then((res) => res.json())
}