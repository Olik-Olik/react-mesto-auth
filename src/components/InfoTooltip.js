//про регистрацию да-нет
import React from "react";
import Success_Icon from '../images/Success_Icon.svg';
import One_More_Icon from '../images/One_More_Ocon.svg';
import Close_Icon_Auth from  '../images/Close_Icon_Auth.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup`}>
            <div className={`auth__popup-windows`}>

                {props.infoSuccses ?
                    ( < img className="auth__popup-image"
                          alt="Успешная иконка регистрации"
                          src={Success_Icon}/> ):

                    (< img className="auth__popup-image"
                           alt="Неуспешная иконка регистрации"
                           src={One_More_Icon}/>)
                }
                    <button  className= "auth__close-icon"
                    type="button"
                    alt="закрытие"
                   < img src={Close_Icon_Auth}      />

            </div>
        </div>
    )
                }

                export default InfoTooltip;

