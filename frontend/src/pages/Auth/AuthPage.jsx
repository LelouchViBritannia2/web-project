import React from 'react'
import Header from '../../components/Header'
import Footer from "../../components/Footer"
import Auth from '../../components/AuthFrom'

function AuthPage() {
    return (
        <>
            <Header />
            <main>
                <div className="main-container">
                    <Auth />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default AuthPage