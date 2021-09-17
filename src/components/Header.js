import React from "react";
import logo from '../Logo.svg';
import '../index.css';

function Header(props) {
    return (
        <div className="header">
            <img alt="logo" className="header__logo" src={logo}/>
            <div className="auth__main-popup ">
                <div className="auth__login-welcome">
                    {/* основная форма*/}
                    <div className="auth__popup-windows">
                        { props.handleInfoTooltipSuccess ? (
                       /*  если все верно то Successs то показываем картинку и слова, что все гуд  */
                            <img src ={Success_Icon}
                            alt = "Success registration"
                            className="auth__tooltip-icon"/>
                            <h1 className="auth__tooltip-phraze">Вы успешно зарегистрировались </h1>
                            ) : (
                            <img src ={OneMoreIcon}
                            alt = "NON Success registration"
                            className="auth__tooltip-icon" />
                            <h1 className="auth__tooltip-phraze">Вы не зарегистрировались </h1>)}
                        <button
                            className="popup__close-button "
                            type="button"
                            onClick={props.onClose}>
                        < img src ={Close_Icon_Auth}
                         alt=" крестик закрытия"
                         className="auth__close-icon"/> </button>
                    </div>
                </div>
            </div>
        </div>)

}
 export default Header;

                    {/*
                <Route exact path = '/'>
                <Link to='/sign-in'  className="">
                 <p className=   onClick={props.handleSignOut }
                <p>Выход</p>
                </Link>
                </Route>

*/}




