import React, { useContext,useEffect, useState } from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {UserContext} from '../context/UserContext'


function PrivateRoute({element:Component}) {
    const [state,dispatch] = useContext(UserContext)
    
    return (
        state.isLogin ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute
