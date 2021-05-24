class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if(!res.ok) {
            return Promise.reject(`Ошибка:${res.status}`);
        }
            return res.json();  
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method:"GET",
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method:'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getResponseData)
    }

    getUserInfoMe() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getResponseData)
    }    

    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body:JSON.stringify({
                avatar: data.link
            })
        })
        .then(this._getResponseData)

    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked)
            {return fetch(`${this._url}/cards/${id}/likes`, {
                method:'PUT',
                headers: this._headers
            })
            .then(this._getResponseData)}
        else {
            return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._getResponseData)
        }    
    }

    delCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method:'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData)

    }

    updateHeaders() {
        this._headers = {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
}    

const api = new Api({
    url:"http://localhost:3000", // localhost:3000
    headers: {
        "Content-type":'application/json',
        authorization:`Bearer ${localStorage.getItem('token')}`
    } 
}) 

export default api;