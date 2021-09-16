import React from "react";
import logo from '../Logo.svg';
import '../index.css';
import {Link, Route} from "react-router-dom";


function Header(props) {

    return (
        <header className="header">
            <img alt="logo" className="header__logo" src={logo}/>


                <Route exact path = '/sign-in'>
                    <Link to='/sign-in'  className="auth__header-line">
                    <p>Регистрация</p>
                    </Link>
                </Route>

                <Route exact path = '/sign-up'>
                <Link to='/sign-in'  className="auth__header-line">
                <p>Вход</p>
                </Link>
                </Route>
        </header>)}

    export default Header;

      {/*
                <Route exact path = '/'>
                <Link to='/sign-in'  className="">
                 <p className=   onClick={props.handleSignOut }
                <p>Выход</p>
                </Link>
                </Route>

*/}




