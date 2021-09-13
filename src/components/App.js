import React, {useEffect, useState,} from "react";
import '../index.css';
import Header from "./Header";
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/Api";

export default function App(props) {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmDeletePopup, setIsConfirmDeletePopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});//Стейт переменная используется
    // как значение провайдера контекста
    //Провайдер контекст транслирует дочерним компонентам это значение.


//card
    useEffect(() =>
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch((err) => {
                    console.log('MAMA, Карточни не  получены!!!: ' + err.toString())
                }
            ), []);

//user
    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log('MAMA, Аватарчик не  получен!!!: ' + err.toString())
            })
    }, [])


    function handleUpdateAvatar(userData) {
        // Запрещаем браузеру переходить по адресу формы
        api.submitUserAvatar({
            'avatar': userData.avatar
        })
            .then(data => {
                setCurrentUser(data);
                closeAllPopups()
            })
            .catch((err) => {
                console.log('MAMA, Аватарчик не  получен!!!: ' + err.toString())
            })
    }

    function handleUpdateProfile(userData) {
        api.submitUserInfo({
            'name': userData.name,
            'about': userData.about
        })
            .then(data => {
                setCurrentUser(data);
                closeAllPopups()
            })
            .catch((err) => {
                console.log('MAMA, username не  получен!!!: ' + err.toString())
            })
    }

//like
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            // Отправляем запрос в API и получаем обновлённые данные карточки
            api.dislike(card._id)
                .then((newCard) => {
                    setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log('MAMA!!! DisLike: ' + err.toString())
                })

        } else {
            api.like(card._id)
                .then((newCard) => {
                    setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log('MAMA!!! Like: ' + err.toString())
                })
        }
    }

    /*
        const handleImagePopupOpen = (evt) => {
            console.log("handleImagePopupOpen")
            props.setIsImagePopup(true)
        }*/

///avatar
    function handleEditAvatarClick(evt) {
        console.log("I'm a walrus!!! Обработчик авы")
        setIsEditAvatarPopupOpen(true);
    }

//profile
    function handleEditProfileClick(evt) {
        console.log("I'm a walrus 2!!!")
        setIsEditProfilePopupOpen(true);
    }


///////place
    function handleAddPlaceClick(evt) {
        console.log("I'm a walrus 3!!!")
        setIsAddPlacePopupOpen(true);
    }

    function handleAddPlaceSubmit(newCard) {
        api.submitNewCard(newCard)
            .then(data => {
                setCards([data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log('MAMA, место не добавлено!!!: ' + err.toString())
            })

    }


    function handleCardClick(card) {
        console.log("I'm a walrus 4!!!")
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }


    function handleCardDeleteClick(card) {
        console.log("Anything interesting - delete");
        const isOwn = card.owner._id === currentUser._id;
        if (isOwn) {
            api.submitRemoveCard(card._id)
                .then(newArrCards => {
                    setCards(cards.filter((c) => c._id !== card._id))
                    closeAllPopups();
                })
                .catch((err) => {
                    console.log('MAMA, фотка не удалена!!!: ' + err.toString())
                })

        }
    }

    function closeAllPopups() {
        console.log("I was so close...")
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmDeletePopup(false);
    }


    return (

        <>
            <Header/>
            <CurrentUserContext.Provider value={currentUser}>
                <Main
                    cards={cards}
                    onCardClick={handleCardClick}

                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}

                    onCardDelete={handleCardDeleteClick}
                    onCardLike={handleCardLike}

                    setIsEditAvatarPopupOpen={(evt) => {
                        console.log("I'm a superstar avatar!!!")
                        handleEditAvatarClick(evt)
                    }}

                    setIsEditProfilePopupOpen={(evt) => {
                        console.log("I'm a superstar too!!!")
                        handleEditProfileClick(evt)
                    }}

                    setIsAddPlacePopupOpen={(evt) => {
                        console.log("I'm a superstar too too!!!")
                        handleAddPlaceClick(evt)
                    }}

                    setIsImagePopup={(evt) =>
                        handleCardClick(evt)
                    }

                />
                {isEditAvatarPopupOpen && <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    handleUpdateAvatar={handleUpdateAvatar}
                    buttonText="Cохранить"/>}

                {isEditProfilePopupOpen && <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    buttonText="Сохранить"
                    handleUpdateProfile={handleUpdateProfile}
                />}
                {isAddPlacePopupOpen && <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlacePopup={handleAddPlaceSubmit}
                    buttonText="Добавить"/>}

                <ConfirmDeletePopup
                    isOpen={isConfirmDeletePopup}
                    onClose={closeAllPopups}
                    buttonText="Да"/>
                {isImagePopupOpen && <ImagePopup
                    isOpen={isImagePopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups}
                />}
            </CurrentUserContext.Provider>
            <Footer/>

        </>
    );
}

