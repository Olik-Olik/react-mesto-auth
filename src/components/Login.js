//для авторизации
import React, {useState} from "react";
import {Link} from 'react-router-dom';

//import './Login.css';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [confirmPEmail, setConfirmEmail]= useState("");

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmitLogin(evt) {
        if (!props.password || !props.email) {
            return;}
        evt.preventDefault();
        if (props.password === props.confirmPassword && props.email === props.confirmEmail) {
            props.handleRegister(password, email)
                .then((res) => {
                    if (res.statusCode !== 400) {
                        props.history.push('/sign-in');
                    }
                });
        }

    }



    return (
        <div className="auth">
            {/*  <Logo title={'MESTO'}/>*/}
            <p className="auth__login-welcome">Регистрация</p>
            <form onSubmit={handleSubmitLogin}
                  className="auth__form-login">

                <input
                    className="auth__form-login-input"
                    required
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}/>
                <label htmlFor="email">
                    email:
                </label>

                <input className="auth__form-login-input-password"
                     /*  id="password"*/
                       required
                       name="password"
                       type="password"
                       value={password}
                       onChange={handleChangePassword}/>
                <label htmlFor="password">
                    password:
                </label>

                <button className="auth__form-login-submit-button"
                        type="submit">
                    Войти
                </button>
            </form>

            <div className="auth__login-signup-Do-Register">
                <p>Уже зарегистрированы? Войти</p>

                <Link to="/sign-up"
                      className="auth__signup-link">
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

