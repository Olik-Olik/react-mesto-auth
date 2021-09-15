//для авторизации
import React, {useState} from "react";
import {Link} from 'react-router-dom';

function Register(props) {
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
            function handleSubmitRegister(evt) {
                evt.preventDefault();
                if (!props.password || !props.email) {
                    return;
                }

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
                    <p className="login__welcome">Регистрация</p>
                    <form onSubmit={handleSubmitRegister}
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

                        <input id="password"
                               required
                               name="password"
                               type="password"
                               value={password}
                               onChange={handleChangePassword}/>
                        <label htmlFor="password">
                            password:
                        </label>

                        <button className="auth__form-login-submit-button"
                                type="submit">Войти
                        </button>
                    </form>


                    <div className="login__signup">
                        <p>Уже зарегистрированы?</p>

                        <Link to="/sign-up"
                              className="signup__link">
                            Зарегистрироваться</Link>
                    </div>
                </div>
            )

    }


export default Register;
