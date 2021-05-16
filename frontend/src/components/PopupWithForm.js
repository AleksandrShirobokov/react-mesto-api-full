import React from 'react'

function PopupWithForm(props) {
    return (
        <section onClick={props.onOverlayClose} className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <h2 className={`popup__${props.title}`}>{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save popup__button">Сохранить</button>
                    <button onClick={props.onClose} className={`popup__close popup__close_${props.name}`} type="button"></button>
                </form>
            </div>

        </section>
    )
} 
export default PopupWithForm;