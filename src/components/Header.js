import React from "react";
import logo from '../Logo.svg';
import '../index.css';
import {Route, Switch, link} from "react-router-dom";


function Header(props) {
    return (
        <header className="header">
            <img alt ="logo" className="header__logo" src={logo}/>
            <Route exact path to '/sign-in'>
            <link   className={} '/sign-in'   />
            <p>Регистрация</p>


            </Route>
        </header>
    );
}

export default Header;


