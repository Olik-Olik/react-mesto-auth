import React from "react";
import logo from '../Logo.svg';
import '../index.css';

function Header() {
    return (
        <header className="header">
            <img
                alt="Место Россия Хедер"
                className="header__logo"
                src={logo}/>
        </header>
    );
}

export default Header;


