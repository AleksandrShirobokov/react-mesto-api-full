import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

    const [placeName, setPlaceName] = React.useState('')
    const [placeLink, setPlaceLink] = React.useState('')

    React.useEffect(() => {
        setPlaceName('')
        setPlaceLink('')
    }, [props.isOpen])

    function dischargeNameInput(e) {
        setPlaceName(e.target.value)
    }

    function dischargeLinkInput(e) {
        setPlaceLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.onAddCard({
            name:placeName,
            link:placeLink
        })
    }

    return (
        <PopupWithForm name="new-card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onOverlayClose={props.onOverlayClose} onSubmit={handleSubmit} children={(
        <>
            <input value={placeName} onChange={dischargeNameInput} className="popup__input popup__input_type_title" id="name-card" placeholder="Название" name="name" minLength="2" maxLength="30" required />
            <span id="name-card-error" className="error"></span>
            <input value={placeLink} onChange={dischargeLinkInput} className="popup__input popup__input_type_link" type="url" id="link" placeholder="Ссылка на картинку" name="link" required />
            <span id="link-error" className="error"></span> 
        </>
        )}>
        </PopupWithForm> 
    )
}

export default AddPlacePopup;