import React from 'react'
import statusSuccess from '../images/UnionNeOK.svg';
import statusUnsuccess from '../images/UnionOk.svg'
function InfoTooltip(props) {
    return (
        <section onClick={props.onOverlayClose} className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container-response">
                        <img className='popup__sign-image' src={`${props.onResponse ? statusSuccess : statusUnsuccess}`} alt={`${props.onResponse ? props.regSuccess : props.regUnsaccess}`} />
                        <h2 className={`popup__title popup__title_type_response`}>{`${props.onResponse ? props.regSuccess : props.regUnsaccess}`}</h2>
                        <p>{props.onMessage}</p>                 
                <button onClick={props.onClose} className={`popup__close`} type="button"></button>
            </div>
        </section>
    )
}
export default InfoTooltip;