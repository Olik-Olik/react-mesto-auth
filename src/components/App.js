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
import {BrowserRouter, Redirect, Route, Switch,  useHistory} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoToolTip from "./InfoToolTip.js";


export default function App(props) {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmDeletePopup, setIsConfirmDeletePopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [email, setEmail] = useState("");
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoTooltipPopup, setInfoTooltipPopup] = useState(false);
    const [infoSuccess, setInfoSuccess] = useState(false);
  //  const [isShowLoad, setIsShowLoad] = useState(false);
    const [credential, setCredential] = useState({});
    const [isRegResOpen, setIsRegResOpen] = useState(false);

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
        setIsRegResOpen(false);

    }

//обработчик регистрации
//обработчик авторизации
//обработчик успешной регистрации
//выхода
    /*Login — компонент авторизации пользователя с необходимыми стейт-переменными.
    Register — компонент регистрации пользователя с необходимыми стейт-переменными.*/


    function handleLogin(password, emmail) {
        return auth
            .login(password, emmail)
            .then((res) => {
                console.log('d');
                if (res.ok) {
                    console.log('e');
                    localStorage.setItem('jwt', res.json().token);
                    setEmail(emmail);
                    setLoggedIn(true);
                    console.log('Залогинились!');
                } else {
                    console.log("Вылезла ошибка, УПС, Повезло-то как! " + res.statusText);
                    return Promise.reject("Вылезла ошибка, УПС, Повезло-то как! " + res.status + ":" + res.statusText);
                }
            })
            .catch((err) => {
                console.log('Не залогинились :( ' + err.toString());
                if (err.status === 400) {
                    console.log('400 Некорректно заполнено одно из полей' + err.toString())
                }
                if (err.status === 401) {
                    console.log("401 пользователь с email не найден" + err.toString())
                }
            })
    }

    function handleRegister(password, email) {
        return auth
            .register(password, email)
            .then((res) => {
                if (res.ok) {
                    setInfoSuccess(true);
                    setIsRegResOpen(true);
                    /*lalalala*/
                    /*history.push("/sign-in")*/
                    console.log("1");
                } else {
                    console.log("Вылезла ошибка, УПС, Повезло-то как! " + res.statusText);
                    return Promise.reject("Вылезла ошибка, УПС, Повезло-то как! " + res.status + ":" + res.statusText);
                }
            })
            .catch((err) => {
                console.log('Не зарегались :( ' + err.toString());
                setInfoSuccess(false);
                console.log(`Вот такая ошибка вылезла ${err}`)
                setInfoSuccess(false);
                setIsRegResOpen(true);
                }
            )
    }

//out off
    function handleSignOut() {
        console.log("2 - logout");
        localStorage.removeItem('jwt')
        setLoggedIn(false);
        /*lalala*/
     /*   history.push("/sign-in")*/
    }

//проверка токена  хуком
/*      useEffect(() => {*/
    function hukUseEffectToken() {
        // если у пользователя есть токен в localStorage,
        // эта функция проверит валидность токена
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            console.log("has JWT");
            // проверим токен в локалсторадж
            auth.checkToken(jwt)
                            // здесь можем получить данные пользователя!
                                // поместим их в стейт внутри App.js
                                .then((res) => {
                                    if (res.ok) {
                                        console.log("333");
                                        /*history.push('/');*/
                                        setLoggedIn(true);
                                    } else {
                                        console.log("Вылезла ошибка при проверке токена, УПС, Повезло-то как! " + res.statusText);
                                        return Promise.reject("Вылезла ошибка, УПС, Повезло-то как! " + res.status + ":" + res.statusText);
                                    }
                                })
                                .catch((err) => {
                                    if (err.status === 400) {
                                        console.log('400 Некорректно заполнено одно из полей' + err.toString())
                                    }

                                    if (err.status === 401) {
                                        console.log("401 Токен пользователь с email не найден" + err.toString())
                                    }
                                }
                )
        }
        else
        {
            console.log('Токена нету!!!');
        }
    }

     useEffect(() => {
        hukUseEffectToken();
    }, []);

    return (
      /*  который предоставит объект истории, который вы ищете, через ловушку.*/
        <BrowserRouter>
            <CurrentUserContext.Provider value={currentUser}>
                <>

                        {loggedIn ? console.log('ww') : console.log('zz')}
                        <Header
                            email={email}
                            credential={credential}
                            loggedIn={loggedIn}
                            handleSignOut={handleSignOut}
                        />
                {/*    <main className="content">*/}
                        <Route>
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in"/>}
                        </Route>

                        <Switch>
                            <ProtectedRoute exact={true} path = '/'
                                            component={Main}
                                            loggedIn={loggedIn}
                                            cards={cards}
                                            onCardClick={handleCardClick}
                                            onEditAvatar={handleEditAvatarClick}
                                            onEditProfile={handleEditProfileClick}
                                            onAddPlace={handleAddPlaceClick}
                                            onCardDelete={handleCardDeleteClick}
                                            onCardLike={handleCardLike}
                                         //   isShow={isShowLoad}

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
                            <Route exact={true} path="/sign-in">
                                <Login
                                    handleLogin={handleLogin}
                                    /*infoSuccess={infoSuccess}*/
                                />
                            </Route>

                            {/*регистрация */}
                            <Route exact={true} path="/sign-up">
                                <Register
                                    handleRegister={handleRegister}
                                    /*infoSuccess={infoSuccess}*/
                                />

                            </Route>
                        </Switch>

                    <InfoToolTip
                        isOpen={isRegResOpen}
                        onClose={closeAllPopups}
                        infoSuccess={infoSuccess}
                    />

                            <EditAvatarPopup
                                isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}
                                handleUpdateAvatar={handleUpdateAvatar}
                                buttonText="Cохранить"/>

                          <EditProfilePopup
                                isOpen={isEditProfilePopupOpen}
                                onClose={closeAllPopups}
                                buttonText="Сохранить"
                                handleUpdateProfile={handleUpdateProfile}
                            />

                            <AddPlacePopup
                                isOpen={isAddPlacePopupOpen}
                                onClose={closeAllPopups}
                                onAddPlacePopup={handleAddPlaceSubmit}
                                buttonText="Добавить"/>


                            <ConfirmDeletePopup
                                isOpen={isConfirmDeletePopup}
                                onClose={closeAllPopups}
                                buttonText="Да"/>

                           <ImagePopup
                                    isOpen={isImagePopupOpen}
                                    card={selectedCard}
                                    onClose={closeAllPopups}/>
                </>
                <Footer/>
            </CurrentUserContext.Provider>
        </BrowserRouter>)
}