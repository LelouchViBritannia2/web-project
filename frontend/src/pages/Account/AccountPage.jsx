import React from 'react'
import Header from '../../components/Header'
import Footer from "../../components/Footer"
import LogoutButton from '../../components/LogoutButton'
function AccountPage() {
    return (
        <>
            <Header />
            <main>
                <div className="main-container">
                   <LogoutButton />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default AccountPage