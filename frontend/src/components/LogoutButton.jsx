import React from "react";
import API from "./api";

function LogoutButton(){
    const handleLogout = async () => {
        const response = await API.post('logout/', {}, {
            withCredentials: true
        })
        
        if (response.status == 200){
            window.location.href = '/';
        }
    }
    return(
        <button className="LogoutButtun" onClick={handleLogout}>Выйти из Аккаунта</button>
    )
}
export default LogoutButton