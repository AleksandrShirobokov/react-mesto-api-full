import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`);
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__image-like ${isLiked && 'element__image-like_active'}`;

    function handleClick() {
        props.onCardClick(props.card);
      }

    function handleLike() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    
    return (
        <div className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__item">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__wrapper">
                    <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
                    <p className="element__image-like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>   
    )
} 

export default Card;