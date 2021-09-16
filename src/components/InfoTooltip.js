//про регистрацию да-нет
import React from "react";
import Succes_Icon from '../images/Success_Icon.svg';
import One_More_Icon from '../images/One_More_Ocon.svg';
import PopupWithForm from "./PopupWithForm";

function InfoTooltip(props) {

    return (
        <div className={`popup`}>
          <div className={`auth__popup-windows`}>

            {props.infoSuccses ?
                ( < img className="auth__popup-image"
               alt="Успешная иконка регистрации"
               src={Success_Icon}/> ) :

                ( < img className="auth__popup-image"
                    alt="Неуспешная иконка регистрации"
                    src={One_More_Icon}/>)

                </div>
                </div>
          <button  className= "auth__close-icon"
          type="button"
          alt="закрытие"
                img src={Close_Icon_Auth}      />
     )

export default InfoTooltip;

