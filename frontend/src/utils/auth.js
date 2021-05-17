export const BASE_URL = 'http://api.krasavchik.students.nomoredomains.monster'; // localhost:3005

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
        if(res) {
            localStorage.setItem('token', res.token);
            return res;
        }
    })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(getResponse)
}