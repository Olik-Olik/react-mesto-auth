//для авторизации
import React, {useState} from "react";
import {Link} from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [confirmEmail, setConfirmEmail]= useState("");

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }
    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }
            function handleSubmitRegister(evt) {
                evt.preventDefault();
                if (!props.password || !props.email) {
                    return;
                }

                if (password === confirmPassword && email === confirmEmail) {
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
                    <form onSubmit={handleSubmitRegister}
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

                        <button className="

                        auth__form-login-submit-button "
                                type="submit">Зарегистрироваться-РЕГИСТЕР
                        </button>

                    <div className="auth__login-signup-Do_Register">
                        Уже зарегистрированы? Войти</div>

                        <Link to="/sign-in"
                              className="auth__signup-link">
                            Войти</Link>

                    </form>
                </div>
            )
    }
export default Register;
/*     className="auth__signup-link-Do-Register">
        Зарегистрироваться</Link>*/
