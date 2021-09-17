import React from "react";
import * as path from "path";
import One_More_Icon from '../images/One_More_Icon.svg';
import Success_Icon from '../images/Success_Icon.svg';

function RegisterResult(props){

    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""} auth__tooltip-icon`}>
            <div className="popup__combine-image">

                <div>
                    <button type="button"
                            onClick={props.onClose}
                            aria-label='Закрыть'
                            className="popup__close-button popup__close-button-no-rel"/>

                </div>
                <div className="popup__combine-word">
                    <div className="popup__container-image">
                        <img className="auth__tooltip-icon"
                             alt="Картинка захода"
                             src={`${props.infoSuccess ? Success_Icon : One_More_Icon}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );


}
export default RegisterResult;