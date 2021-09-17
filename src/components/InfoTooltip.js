/*//про регистрацию да-нет
import React from "react";
import Success_Icon from '../images/Success_Icon.svg';
import One_More_Icon from '../images/One_More_Icon.svg';
import Close_Icon_Auth from  '../images/Close_Icon_Auth.svg';
/!* sing-up регистрация
* sing-in вход
* InfoTooltip — компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.*!/
function InfoTooltip(props) {
    return (
        <div className={`popup`}>
            <div className={`auth__popup-windows`}>

                <div className="auth__login-welcome">
                    {/!* основная форма*!/}
                    <div className="auth__popup-windows">
                        {props.handleInfoTooltipSuccess ?
                            (
                                /!*  если все верно то Successs то показываем картинку и слова, что все гуд  *!/
                                <img src ={Success_Icon}
                                     alt = "Success registration"
                                     className="auth__tooltip-icon"/>
                            <p className="auth__tooltip-phraze">Вы успешно зарегистрировались </p>
                            ) : (
                            <img src ={OneMoreIcon}
                            alt = "NON Success registration"
                            className="auth__tooltip-icon" />
                            <h1 className="auth__tooltip-phraze">Вы не зарегистрировались </p>)}
                        <button
                            className="popup__close-button "
                            type="button"
                            onClick={props.onClose}>
                            <img src ={Close_Icon_Auth}
                                  alt=" крестик закрытия"
                                  className="auth__close-icon"/> </button>
                    </div>
                </div>
            </div>
        </div>)
}

                export default InfoTooltip;*/

