export const BASE_URL = 'https://auth.nomoreparties.co';

// err!!!
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
//token authentication is an HTTP authentication scheme that involves security tokens called bearer tokens
            'Authorization': `Bearer ${token}`,
        }
    }).then((response) => handleResponse(response));


  /*      .then((credential) => {
            return (credential)
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })*/
    //   .catch() дописать
}


export const register = (password, email) =>{
    return fetch(`${BASE_URL}/signup`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then((response) => handleResponse(response));
}
 function handleResponse(response) {
    if (response.ok) {
        console.log("Got response: " + response.status + ":" + response.statusText);
        return response;//.json()
    } else {
        console.log("Вылезла ошибка, УПС, Повезло-то как! " + response.statusText);
        return response;
        //return Promise.reject("Вылезла ошибка, УПС, Повезло-то как! " + response.status + ":" + response.statusText);
    }
}

//IN
export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    }).then((response) => handleResponse(response));

};

