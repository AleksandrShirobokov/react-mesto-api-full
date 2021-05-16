import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onOverlayClose={props.onOverlayClose} onClose={props.onClose} onSubmit={handleSubmit} children={(
        <>
            <input value={name || ''} type="text" className="popup__input popup__input_type_name" id="user-name" name="name" placeholder="Имя" required minLength="2" maxLength="40" onChange={handleChangeName} />
            <span id="user-name-error" className="error"></span>
            <input value={description || ''} type="text" className="popup__input popup__input_type_job"  id="user-about"     name="about"  placeholder="Вид деятельности" required minLength="2" maxLength="200" onChange={handleChangeDescription} />
            <span id="about-error" className="error"></span>
        </>
        )}>
        </PopupWithForm> 
    )
} 
export default EditProfilePopup;