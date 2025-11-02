import React, { useState } from "react";
import API from './api.jsx';

function Registration() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(null);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!password || !email) {
            return;
        }

        const response = await API.post('account/', {
        password: password,
        email: email
        });

        setSubmitted({email: email });
        setEmail("");
        setPassword("")
        window.location.href = '/';
    }

    return (
        <>
            <form>
                <label><h2>Регистрация</h2></label><br />
                <label>Электронная почта</label>
                <input type="email" value={email} onChange={handleChangeEmail}/><br />
                <label>Пароль</label>
                <input type="password" value={password} onChange={handleChangePassword}/><br />
                <button onClick={handleSubmit}>Принять</button>
            </form>
        </>
    )
}

export default Registration;