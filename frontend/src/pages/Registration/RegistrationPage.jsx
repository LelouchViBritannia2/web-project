import React from 'react'
import Header from '../../components/Header'
import Footer from "../../components/Footer"
import Registration from '../../components/RegistrationForm'

function RegistrationPage(){
    return(
        <>
            <Header />
            <main>
                <div className="main-container">
                    <Registration />
                </div>
            </main>
            <Footer />
        </>
    )
}
export default RegistrationPage