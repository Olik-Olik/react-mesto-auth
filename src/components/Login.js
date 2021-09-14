//для авторизации
import React from "react";
import {Link, withRouter} from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        //  this.state = {
        //   "password": " ",
        //    "email": " "
//необходимыми стейт-переменными
        const [password, setPassword] = React.useState(" ");
        const [email, setEmail] = React.useState(" ");
    }
}
 this.handleChangeLogin = this.handleChangeLogin.bind(this);
 this.handleChangeLogin =(evt)=>{setEmail(evt.target.value);}
     //или через функциональные компоненты
//login
this.handleSubmitLogin = this.handleSubmitLogin.bind(this);

// здесь обрабатываем вход в систему email
this.handleSubmitLogin=(evt) => evt.preventDefault()
{ /*if (!this.email){return}*/
    this.email.then(()=>{history.push("/");})
        .catch((err)=>console.log("МАМА email:" + err.toString() ))
}

//password
this.handleChangePassword = this.handleChangePassword.bind(this);
this.handleChangePassword =(evt)=>{this.setPassword(evt.target.value);}

this.handleSubmitPassword = this.handleSubmitPassword.bind(this)

// здесь обрабатываем вход в систему password
this.handleSubmitPassword=(evt) => {
    evt.preventDefault()
    if (!this.state.password || !this.state.email){
        return;

    /*{
        if (!this.password) {
            return;
        }*/
        this.password.then(()=>{history.push("/");})
            .catch((err)=>console.log("МАМА password:" + err.toString() ))
    }
}


   /*this.handleChange(evt) {
        const {name, value} = evt.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(evt){
        evt.preventDefault();
        // здесь обрабатываем вход в систему password
    }*/
