import React, { useState } from "react";
import API from './api.jsx';
import CityAutoComplete from "./CitiesAutoComplete.jsx";

function Registration() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [last_name, setlast_name] = useState("")
    const [city, setcity] = useState("")
    const [birthday, setbirthday] = useState("")
    const [phone_number, setphone_number] = useState("") 
    
    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const ErrorMessage = ({ message }) => (message ? <p className="Error_massage">{message}</p> : null);

    const handleChangeEmail = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setEmail(value);
    }

    const handleChangePassword = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setPassword(value); 
    }

    const handleChangename = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setName(value);
    }

    const handleChangelast_name = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setlast_name(value);
    }

    const handleChangecity = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setcity(value);
    }

    const handleChangebirthday = (e) => {
        setbirthday(e.target.value);
    }

    const handleChangephone_number = (e) => {
        const value = e.target.value.replace(/\D/g, '').trimStart().trimEnd()
        setphone_number(value);
    }

    const validateForm = () => {
        const errors = {}
        let isValid = true

        if (!name){
            errors.name = "Поле обязательно для заполнения"; isValid = false
        }

        if (!last_name){
            errors.last_name = "Поле обязательно для заполнения"; isValid = false
        }

        if (!phone_number || phone_number.length != 11){
            errors.phone_number = "Введите корректный номер телефона"; isValid = false
        }

        if (!birthday){
            errors.birthday = "Поле обязательно для заполнения"; isValid = false
        }

        if (!city){
            errors.city = "Поле обязательно для заполнения"; isValid = false
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)){
            errors.email = "Введите корректный email"; isValid = false
        }

        if (!password || password.length < 6){
            errors.password = "Введите пароль не менее 6 символов"; isValid = false
        }
        setFormErrors(errors)
        return isValid
    }
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError(null);
        setSubmitted(null);

        
        if (!validateForm()){
            setError("Ошибка регистрации")
            return
        }
        try{
        const response = await API.post('account/', {
        password: password,
        email: email,
        name: name,
        last_name: last_name,
        city: city,
        birthday: birthday,
        phone_number: phone_number,
        });

        setSubmitted({email: email });
        setEmail("");
        setPassword("")
        setName("")
        setlast_name("")
        setcity("")
        setbirthday("")
        setphone_number("")
        setFormErrors({});
        window.location.href = '/';
    }
    catch(err){
        console.error("Ошибка регистрации:", err.response ? err.response.data : err.message);
        if (err.response && err.response.data && err.response.data.details) {
                const serverErrors = err.response.data.details; 
                const newFormErrors = {};
                if (serverErrors.email) {
                    newFormErrors.email = serverErrors.email;
                }
                if (serverErrors.phone_number) {
                    newFormErrors.phone_number = serverErrors.phone_number;
                }
                setError("Ошибка Регистрации")
                setFormErrors(newFormErrors);
            }
            else {
                setError("Ошибка регистрации. Пожалуйста, проверьте данные или попробуйте позже.");
            }
        }
    }

    return (
        <>
             <form onSubmit={handleSubmit}> 
                <label><h2>Регистрация</h2></label><br />
                <label>Имя</label>
                <input type="text" value={name} onChange={handleChangename}/><br/>
                <ErrorMessage message={formErrors.name} />

                <label>Фамилия</label>
                <input type="text" value={last_name} onChange={handleChangelast_name}/><br/>
                <ErrorMessage message={formErrors.last_name} />

                <label>Номер телефона</label>
                <input type="text" value={phone_number} onChange={handleChangephone_number}/><br/>
                <ErrorMessage message={formErrors.phone_number} />

                <label>Город</label>
                <CityAutoComplete value={city} onChange={handleChangecity}/><br/>
                <ErrorMessage message={formErrors.city} />

                <label>Дата рождения</label>
                <input type="date" max="2999-12-31" value={birthday} onChange={handleChangebirthday}/><br/>
                <ErrorMessage message={formErrors.birthday} />

                <label>Электронная почта</label>
                <input type="email"  value={email} onChange={handleChangeEmail}/><br />
                <ErrorMessage message={formErrors.email} />

                <label>Пароль</label>
                <input type="password" value={password} onChange={handleChangePassword}/><br />
                <ErrorMessage message={formErrors.password} />

                <button type="submit">Зарегистрироваться</button>
                {<ErrorMessage message={error} />}

                <section className="auth_registr_question">
                        <p>Есть аккаунт?</p>
                        <a href="/auth">Войти</a>
                </section>
            </form>
        </>
    )
}

export default Registration;
