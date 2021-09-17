import React from "react";
import logo from '../Logo.svg';
import '../index.css';
import {Link, Route} from "react-router-dom";
/* sing-up регистрация
* sing-in вход*/
/* Если залогинился и нажал на выход-Выйти*/

function Header(props) {
    return (
        <header className="header">
            <img alt="logo" className="header__logo" src={logo}/>
         {/*    Если залогинился и нажал на выход-Выйти  */}

            <Route exact path = '/sign-in'>
                <Link to='/sign-in'   onClick={props.handleSignOut} className="auth__header-exit">
                    <p>Выход</p>
                </Link>
            </Route>
            <Route exact path = '/sign-in'>
                <Link to='/sign-up'  className="auth__header-exit">
                    <p>Регистрация</p>
                </Link>
            </Route>
            <Route exact path = '/sign-up'>
                <Link to='/sign-in'  className="auth__header-exit">
                    <p>Вход</p>
                </Link>
            </Route>


        </header>)}

export default Header;

