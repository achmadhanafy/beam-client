import React, { useState } from 'react'
import landingBackground from '../assets/landingBackground.png'
import beamLogo from '../assets/beamLogo.png'
import Login from '../component/Login'
import eclipse from '../assets/eclipse.png'
import LoginMobile from '../component/LoginMobile'


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
        <div>
            <div className="flex w-screen h-screen webdisplay">
                <div className="w-2/4 bg-red-500" style={{backgroundImage:`url(${landingBackground})`,backgroundSize:'682px 100vh',backgroundRepeat:'no-repeat'}}>
                    <div className="ml-16 mt-12">
                        <img src={beamLogo} alt="" className="mb-5" style={{width:'118px'}}/>
                        <p className="text-4xl font-semibold text-white w-3/4">Enjoy the Convenience of Beam Space Storage</p>
                    </div>
                    
                </div>
            <Login showRegister={handleShowRegister} showLogin={handleShowLogin} show={showLogin}/>
                
            </div>
            <div className="mobiledisplay flex flex-col justify-center">
                <div style={{backgroundImage:`url(${eclipse})`,backgroundSize:'100vw 200px',backgroundRepeat:'no-repeat'}}>
                    <div className="w-screen pt-5 pl-5" style={{height:'200px'}}>
                        <img className="mb-5" src={beamLogo} width="92px" alt=""/>
                        <p className="text-white text-3xl font-semibold w-4/5">Enjoy the Convenience of Beam Space Storage</p>
                    </div>

                    <LoginMobile showRegister={handleShowRegister} showLogin={handleShowLogin} show={showLogin}/>
                    
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage
