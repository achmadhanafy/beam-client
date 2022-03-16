import React, { useState } from 'react'
import landingBackground from '../assets/landingBackground.png'
import beamLogo from '../assets/beamLogo.png'
import Login from '../component/Login'


function LandingPage() {
    const [showLogin,setShowLogin] = useState(true)

    const handleShowRegister = (e) =>{
        e.preventDefault()
        setShowLogin(false)
    }

    const handleShowLogin = (e) =>{
        e.preventDefault()
        setShowLogin(true)
    }

    return (
        <div className="flex w-screen h-screen">
            <div className="w-2/4 bg-red-500" style={{backgroundImage:`url(${landingBackground})`,backgroundSize:'682px 100vh',backgroundRepeat:'no-repeat'}}>
                <div className="ml-16 mt-12">
                    <img src={beamLogo} alt="" className="mb-5" style={{width:'118px'}}/>
                    <p className="text-4xl font-semibold text-white w-3/4">Enjoy the Convenience of Beam Space Storage</p>
                </div>
                
            </div>
           <Login showRegister={handleShowRegister} showLogin={handleShowLogin} show={showLogin}/>
            
        </div>
    )
}

export default LandingPage
