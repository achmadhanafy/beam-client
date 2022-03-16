import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Home() {
    const [state,dispatch] = useContext(UserContext)
    const handleLogout = () => {
        dispatch({
            type:"LOGOUT"
          })
    }
    console.log(state.user);
    return (
        <div className="flex justify-center items-center h-screen text-3xl">
            
            <p> Wellcome {state.user.fullName} You are succesfull Login</p> 
            <button className="text-red-400" onClick={handleLogout}>. Click Here for logout</button>
        </div>
    )
}

export default Home
