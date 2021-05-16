import React from 'react'

function ImagePopup(props) {
    return (
        <section onClick={props.onOverlayClose} className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__wrapper">
                    <button className="popup__close popup__close_image" onClick={props.onClose} type="button"></button>
                    <img className="popup__image" src={props.card.link}  alt={props.card.name}/>
                    <h2 className="popup__subtitle">{props.card.name}</h2>
            </div>
        </section>     
    )
} 
export default ImagePopup;