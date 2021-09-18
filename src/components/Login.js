//для авторизации
import React, {useState} from "react";
import {Link} from 'react-router-dom';


function Login(props) {
/*    const [email, setEmail] = useState(`Email`);
    const [password, setPassword] = useState(`Пароль`);*/

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmitLogin(evt) {
        evt.preventDefault();
            props.handleLogin(password, email);
    }

    return (
        <div className="auth">
            <p className=" auth__login-welcome">Вход</p>
            <form onSubmit={handleSubmitLogin}
                  className="auth__form-login">

                {/*<label htmlFor="email"  className="auth__login-label">
                    Email
                </label>*/}
                <input
                    className="auth__form-login-input-email"
                    required
                    name="email"
                    type="email"
                    value={email ||""}
                    placeholder="Email"
                    onChange={handleChangeEmail}/>
                {/*<label htmlFor="password" className="auth__login-label">
                    Пароль
                </label>*/}

                <input className="auth__form-login-input-password"
                       autoComplete="off"
                       required
                       name="password"
                       type="password"
                       value={password ||""}

                       placeholder="Пароль"
                       onChange={handleChangePassword}
                />

                <button className="auth__form-login-submit-button"
                        type="submit">Войти
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

