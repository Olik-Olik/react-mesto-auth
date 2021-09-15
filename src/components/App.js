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
import {BrowserRouter, Redirect, Route, Switch, useHistory} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import * as auth from './auth';

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
/*    const [userData, setUserData] = useState(false);*/
    const [infoTooltipPopup, setInfoTooltipPopup] = useState(false);
    const [infoSuccess, setInfoSuccess] = useState(false);
    const [isShowLoad, setIsShowLoad] = useState(false);
    const [credential, setCredential] = useState({});


    /* useEffect(()=> {
         isShow(true);*/
//card
    useEffect(() =>
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch((err) => console.log('MAMA, Карточки не  получены!!!: ' + err.toString())
                /* .finally(()=> setIsShow(false))*/
            ), []);
    /* })*/

    /* useEffect(()=> {
         isShow(true);*/
//user
    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log('MAMA, Аватарчик не  получен!!!: ' + err.toString())
            })
    }, []);

    /* })*/

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

//обработчик регистрации
//обработчик авторизации
//обработчик успешной регистрации

    function handleLogin({password, email}) {
        return auth.login(password, email)
            .then((res) => {
                    if (res && email || res && password)
                        history.push("/")
                    else console.log("УПС, не получилось зайти к себе")
                        .catch((err) => {
                                console.log(`Вот такая ошибка вылезла ${err}`)
                            }
                        )
                }
            )
    }

    function handleRegister({password, email}) {
        return auth.register(password, email)
            .then((res) => {
                //успешен то кладем в
                if (res) {//успешен
                    history.push("/sign-in");
                } else {
                    console.log("Не получилось зарегистрироваться")
                        .catch((err) => {
                                console.log(`Вот такая ошибка вылезла ${err}`)
                            }
                        )
                }}
            )
            }

//out off
    function handleSignOut() {
        localStorage.removeItem('jwt')
        setLoggedIn(false);
        history.push("/sign-in")
    }

//проверка токена каждый раз хуком
    /*  useEffect(() => {*/
    function hukUseEffectToken() {
        // если у пользователя есть токен в localStorage,
        // эта функция проверит валидность токена
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            // проверим токен в локалсторадж
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        // здесь можем получить данные пользователя!
                        const credential = {
                            password: res.password,
                             email: res.email
                        }
                        // поместим их в стейт внутри App.js
                       .then((res)=> {
                        setEmail(res.credential.email);
                        setPassword(res.credential.password);
                        setLoggedIn(true);
                        props.history.push("/")
                    }
                        ,[history])
                    }
                });
        }
    }

    useEffect(() => {
        hukUseEffectToken()
    }, [loggedIn]);

    return (
        <BrowserRouter>
            <CurrentUserContext.Provider value={currentUser}>
                <>
                    <main className="content">
                        <Header
                            credential={credential}
                            loggedIn={loggedIn}
                            handleSignOut={handleSignOut}
                        />
                        <Switch>
                            {/*НОС защита от неавторизованных*/}
                            <ProtectedRoute exact path="/"
                                            component={Main}
                                            loggedIn={loggedIn}
                                            cards={cards}
                                            onCardClick={handleCardClick}
                                            onEditAvatar={handleEditAvatarClick}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick}
                                            onCardDelete={handleCardDeleteClick}
                                            onCardLike={handleCardLike}
                                            isShow={isShowLoad}
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
                                                handleCardClick(evt)}
                            />

                            {/*авторизация*/}
                            <Route exact path="/sign-in">
                                <Login
                                    handleLogin={props.handleLogin}
                                    handleInfoTooltip={props.handleInfoTooltip}
                                />
                            </Route>

                            {/*регистрация */}
                            <Route exact path="/sign-up">
                                <Register
                                    handleRegister={props.handleRegister}
                                    handleInfoTooltip={props.handleInfoTooltip}/>
                            </Route>

                            < Route>
                                {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-up"/>}
                            </Route>


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
                            />
                            }
                            {isAddPlacePopupOpen && <AddPlacePopup
                                isOpen={isAddPlacePopupOpen}
                                onClose={closeAllPopups}
                                onAddPlacePopup={handleAddPlaceSubmit}
                                buttonText="Добавить"/>
                            }

                            <ConfirmDeletePopup
                                isOpen={isConfirmDeletePopup}
                                onClose={closeAllPopups}
                                buttonText="Да"/>

                            {
                                isImagePopupOpen && <ImagePopup
                                    isOpen={isImagePopupOpen}
                                    card={selectedCard}
                                    onClose={closeAllPopups}/>
                            }
                        </Switch>
                    </main>
                </>
                <Footer/>
            </CurrentUserContext.Provider>
        </BrowserRouter>)


}
