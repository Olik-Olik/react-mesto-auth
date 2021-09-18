//для авторизации
import React, {useState} from "react";
import {Link} from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmitLogin(evt) {
        evt.preventDefault();
        if (!props.email)
        {return;}
            props.handleRegister(password, email)
                .then((res) => {
                    if (res.statusCode !== 400) {
                        props.history.push('/sign-in');
                    }
                });
    }


    return (
        <div className="auth">
            <p className="auth__login-welcome">Регистрация</p>
            <form onSubmit={handleSubmitLogin}
                  className="auth__form-login">

                <label htmlFor="email">
                    email:
                </label>
                <input
                    className="auth__form-login-input-email"
                    required
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}/>
                <label htmlFor="password">
                    password:
                </label>

                <input className="auth__form-login-input-password"
                       required
                       name="password"
                       type="password"
                       value={password}
                       onChange={handleChangePassword}/>

                <button className="auth__form-login-submit-button"
                        type="submit">
                    Войти Ура
                </button>
            </form>

            <div className="auth__login-signup-Do-Register">
                <p>Уже зарегистрированы? Войти</p>

                <Link to="/sign-up"
                      className="auth__signin-link">
                    Зарегистрироваться</Link>
            </div>
        </div>
    )

}

export default Login;

/* this.handleChangeLogin = this.handleChangeLogin.bind(this);
 this.handleChangeLogin = (evt) => {
     setEmail(evt.target.value);
 }

 //login ааааааа-через функциональный компонент проще
 this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
 // здесь обрабатываем вход в систему email
 this.handleSubmitLogin=(evt) => evt.preventDefault()
 //password
 this.handleChangePassword = this.handleChangePassword.bind(this);
 this.handleChangePassword =(evt)=>{this.setPassword(evt.target.value);}
 this.handleSubmitPassword = this.handleSubmitPassword.bind(this)
 // здесь обрабатываем вход в систему password
 this.handleSubmitPassword=(evt) => {
     evt.preventDefault()
     if (!this.state.password || !this.state.email){
         return}


         this.password.then(()=>{history.push("/");})
             .catch((err)=>console.log("МАМА password:" + err.toString() ))
         this.email.then(()=>{history.push("/");})
             .catch((err)=>console.log("МАМА email:" + err.toString() ))
 }

 */

