import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie'
import API from './api.jsx';

function AuthButton(){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const checkAuthentication = async () => {
        const response = await API.get('current-user/')
        if (response.data.is_authenticated){
            setIsAuthenticated(true)
            setCurrentUser(response.data.account)
            Cookies.set('user', JSON.stringify(response.data.account), {expires:30})
        }
        else{
            Cookies.remove('user')
        }
    }

    const handelLoginSucces = (userData) => {
        setIsAuthenticated(true);
        setCurrentUser(userData)
        Cookies.set('user', JSON.stringify(userData), {expires: 30})
        setshowLogin(false)
    }
    
    useEffect(() => {
        checkAuthentication();
    }, []);

    if (isAuthenticated && currentUser){
        return (
            <nav className="top-bar-conteiner">
                <a href="/account">Мой аккаунт</a>
            </nav>
        )
    }
    
    return(
        <nav className="top-bar-conteiner">
                <a href="/registration">Зарегистрироваться</a>
                <a href="auth.html">Войти</a>
        </nav>
    )
}
export default AuthButton