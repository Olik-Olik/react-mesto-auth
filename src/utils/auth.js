export const BASE_URL = 'https://auth.nomoreparties.co';

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
        return response;//.json()
       // return response.json()
    } else {
        return response;
       // return Promise.reject("Вылезла ошибка, УПС, Повезло-то как! " + response.status + ":" + response.statusText);
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
    })
        .then((response) => handleResponse(response))
        /*.then ((data)=> {
            localStorage.setItem('jwt', data.json().token)
            return data.token;
        })*/
        .catch((err) => {
            console.log('Не залогинились :( ' + err.toString());})}

        /*.then((res)=> {
            if (res.ok) {
                console.log('e');
                localStorage.setItem('jwt', res.json().token)
                console.log('Залогинились!');
                 return res.json().token;
            }})
        .catch((err) => {
            console.log('Не залогинились :( ' + err.toString());
            if (err.status === 400) {
                console.log('400 Некорректно заполнено одно из полей' + err.toString())
            }
            if (err.status === 401) {
                console.log("401 пользователь с email не найден" + err.toString())
            }
        })*/




