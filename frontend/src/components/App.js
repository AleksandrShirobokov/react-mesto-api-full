import React, {useEffect} from 'react'
import Header from './Header' 
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Login from './Login'
import InfoTooltip from './InfoTooltip'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import * as auth from '../utils/auth'

function App() {

    const [cards, setCards] = React.useState([]) 
    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); 
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); 
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); 
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isPopupImageOpen, setPopupImageOpen] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [resSuccess, setResSuccess] = React.useState(false)
    const [message, setMessage] = React.useState('');

    const history = useHistory();

    useEffect(() => {
        if(loggedIn) {
            api.getUserInfoMe()
            .then(res => {
               setCurrentUser(res);
            })
            .catch(err=>console.log(err))    

            api.getInitialCards()
            .then(res => {
                setCards(res);
            })                 
        }   
    },[loggedIn])

    function handleLogin() {
        setLoggedIn(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleInfoTooltipClick() {
        setInfoTooltipOpen(true);
    }

    function handleCardClick(card) {
        setPopupImageOpen(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setPopupImageOpen(false)
        setInfoTooltipOpen(false)
    }

    function handleOverlayClose(evt) {
        if(evt.target === evt.currentTarget) {
            closeAllPopups()
        }
    }

    React.useEffect(() => {
        function handleEscClose(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups()
                console.log('esc')
            }
        }
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        }
    })
    
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err=>console.log(err));
    }

    function handleDeleteCard(card) {
        api.delCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id)
        )})
        .catch(err=>console.log(err))
    }

    function handleUpdateUser(data) {
        api.changeUserInfo(data)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        })
        .catch(err=>console.log(err))
    }

    function handleUpdateAvatar(data) {
        api.editAvatar(data)
        .then((data) => {
            setCurrentUser(data)
            closeAllPopups()
        }) 
        .catch(err=>console.log(err))
    }

    function handleAddPlaceSubmit(data) {
        api.postNewCard(data)
        .then((data) => {
            setCards([data, ...cards])
            closeAllPopups()
        })
        .catch(err=>console.log(err))
    }

    function signOut() {
        localStorage.removeItem('token');
        history.push('/sign-in');
        setLoggedIn(false);
    }
                // REGISTRATION //
    function handleRegisterSubmit(password, email) {
        auth.register(password, email)
        .then((res) => {
            if(res) {
                history.push('/sign-in')
                setInfoTooltipOpen(true)
                setResSuccess(true)
                setMessage('');
            } 
        })
        .catch((err) => {
            setInfoTooltipOpen(true)
            setResSuccess(false)
            if(err === 400) {
            setMessage('*Некорректно заполнено одно из полей')
            } 
        }) 
    }
                 // LOGIN //
    function handleLoginSubmit(password, email) {
        auth.authorize(password, email)
        .then((data) => {
            if(data.token) {
                    handleLogin();
                    history.push('/');  
            }
        })
        .catch((err) => {
            if(err === 400) {
                console.log('*Не передано одно из полей')
            } 
            if(err === 401) {
                console.log('*Пользователь с email не найден')
            }    
        })
    }
                // TOKEN //
    React.useEffect(() => {
            const token = localStorage.getItem('token');
            if(token) {
                auth.getContent(token)
                .then((res) => {
                    if(res) { 
                      handleLogin();
                      history.push('/')
                      setEmail(res.email) 
                    }
                })
                .catch((err) => {
                    if(err === 401) {
                        console.log('*Токен не передан или передан не в том формате')
                    }
                    if(err === 401) {
                        console.log('*Переданный токен некорректен')
                    }
                })
            }
    },[history])

    return (
    <>
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header email={email} onSignOut={signOut} />  
                    <Switch>
                        <ProtectedRoute 
                            exact path="/"
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteCard}
                            loggedIn={loggedIn}
                            component={Main}
                        /> 

                        <Route path="/sign-up">
                            <Register onRegister={handleRegisterSubmit} />
                        </Route>
                        <Route path="/sign-in">
                            <Login onLogin={handleLoginSubmit} />
                        </Route>
                        <Route>
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                        
                    </Switch>
                
                <Footer />

                <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onOverlayClose={handleOverlayClose} 
                onUpdateUser={handleUpdateUser}>
                </EditProfilePopup>

                <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
                onOverlayClose={handleOverlayClose} 
                onUpdateAvatar={handleUpdateAvatar}>
                </EditAvatarPopup>

                <AddPlacePopup 
                isOpen={isAddPlacePopupOpen} 
                onClose={closeAllPopups} 
                onOverlayClose={handleOverlayClose} 
                onAddCard={handleAddPlaceSubmit}>
                </AddPlacePopup>
                    
                <ImagePopup 
                card={selectedCard} 
                isOpen={isPopupImageOpen} 
                onClose={closeAllPopups} 
                onOverlayClose={handleOverlayClose}
                /> 

                <InfoTooltip 
                isOpen={isInfoTooltipOpen} 
                onClose={closeAllPopups} 
                onOverlayClose={handleOverlayClose} 
                onSign={handleInfoTooltipClick} 
                onResponse={resSuccess}
                regSuccess='Вы успешно зарегистрировались!'
                regUnsaccess='Что-то пошло не так... Попробуйте ещё раз'
                onMessage={message}
                /> 

                <PopupWithForm name="delete" title="Вы уверены?" /* isOpen="popup_opened" *//>
            </CurrentUserContext.Provider>
        </div>
    </>  
  );
  
}

export default App;
