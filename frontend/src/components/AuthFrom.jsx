import React, { useState } from "react";
import API from './api.jsx';

function Auth() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const ErrorMessage = ({ message }) => (message ? <p className="Error_massage">{message}</p> : null);
    const [submitted, setSubmitted] = useState(null);

    const handleChangeEmail = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setEmail(value);
    }

    const handleChangePassword = (e) => {
        const value = e.target.value.trimStart().trimEnd()
        setPassword(value); 
    }

    const validateForm = () => {
        const errors = {}
        let isValid = true

        if (!email || !/\S+@\S+\.\S+/.test(email)){
            errors.email = "Введите корректный email"; isValid = false
        }

        if (!password || password.length < 6){
            errors.password = "Некорректный пароль"; isValid = false
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
        });

        setSubmitted({email: email });
        setEmail("");
        setPassword("")
        setFormErrors({});
        window.location.href = '/';
    }
    catch(err){
        console.error("Ошибка Входа:", err.response ? err.response.data : err.message);
        if (err.response && err.response.data && err.response.data.details) {
                const serverErrors = err.response.data.details; 
                const newFormErrors = {};
                if (serverErrors.email) {
                    newFormErrors.email = serverErrors.email;
                }
                setError("Ошибка Входа")
                setFormErrors(newFormErrors);
            }
            else {
                setError("Ошибка Входа. Пожалуйста, проверьте данные или попробуйте позже.");
            }
        }
    }

    return (
        <>
            <form>
                <label><h2>Вход в Аккаунт</h2></label><br />
                <label>Электронная почта</label>
                <input type="text"  value={email} onChange={handleChangeEmail}/><br />
                <ErrorMessage message={formErrors.email} />

                <label>Пароль</label>
                <input type="password" value={password} onChange={handleChangePassword}/><br />
                <ErrorMessage message={formErrors.password} />

                <section className="auth_registr_question">
                        <p>Нет аккаунта?</p>
                        <a href="/registration">Зарегистрироваться</a>
                </section>
            </form>
        </>
    )
}
export default Auth