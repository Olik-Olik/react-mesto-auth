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
    })


        .then((credential)=>{return (credential)})
        .catch((err) => {
        console.log(err)
        return Promise.reject(err)})
     //   .catch() дописать
}


export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })

        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res;
        })
        //   .catch() дописать
        .catch((err) => {
            console.log(err)
            return Promise.reject(err)})

};

//IN
export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })

        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
        .catch((err) => {
            console.log(err)
            return Promise.reject(err)})

       /* .catch((err) => {
            console.log('MAMA, Криво заполнено одно из полей!!!: ' + err.toString())
            return Promise.reject(err)})
        });*/

};

