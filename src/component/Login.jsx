import React, { useContext, useEffect, useState } from 'react'
import googleIcon from '../assets/googleIcon.png'
import Modal from 'react-modal'
import facebookLogo from '../assets/facebookLogo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import {API,setAuthToken} from '../config/api'
import { UserContext } from '../context/UserContext'
import success from '../assets/circle-check-solid.png'

function Login({showRegister,show,showLogin}) {
    const [state,dispatch] = useContext(UserContext)
    const [form,setForm] = useState({
        email:"",
        password:"",
        fullName:""
    })
    
    const [showModal,setShowModal] = useState(false)
    const [showModalLogin,setShowModalLogin] = useState(false)
    
    const [message,setMessage] = useState()
    const [message2,setMessage2] = useState()
    const {email,password,fullName} = form

    const navigate = useNavigate()

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          paddingRight:'30px',
          paddingLeft:'30px',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          borderRadius:'10px',
          transform: 'translate(-50%, -50%)',
        },
      };

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    const handleCloseModal = () =>{
        setShowModal(false)
        setShowModalLogin(false)
    }
    const HandleRegister = async (e) => {
        e.preventDefault()
        try {

            //config
            const config = {
                headers:{
                    "Content-type":"application/json"
                }
            }

            //body
            const body = {
                email:form.email,
                fullName:form.fullName,
                password:form.password
            }

            //insert data to database
            const response = await API.post("/register",body,config)

            // Notification
            if (response.data.status === "success"){
                setShowModal(true)
                setForm({
                    email:"",
                    password:"",
                    fullName:""
                })
                setMessage(null)
                document.getElementById("toLogin").click()
            } else {
                console.log(response.data.message);
                setMessage(response.data.message)
                setForm({
                    email:"",
                    password:"",
                    fullName:""
                })

            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            console.log('masuk');
             //config
             const config = {
                headers:{
                    "Content-type":"application/json"
                }
            }

            //body
            const body = {
                email:form.email,
                password:form.password
            }

            //Login
            const response = await API.post('/login',body,config)

            if (response.data.status === "success"){
                setShowModalLogin(true)
                dispatch({
                    type:'LOGIN',
                    payload: response.data.data
                })
                const response2 = await API.get('/user')
                console.log(response2.data.data.user);
                if (response2.status == 200){
                    dispatch({
                    type:"USER_SUCCESS",
                    payload: response2.data.data.user,
                    })
                    navigate('/home')
                } else {
                    return dispatch({
                    type:"LOGOUT"
                    })
                }

            } else {
                if(response.data.status == 'failed validation'){
                    setMessage2(response.data.error.message)
                } else {
                    setMessage2(response.data.message)
                } 
                
                setForm({
                    email:"",
                    password:"",
                    fullName:""
                })

            }

            
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        setMessage(null)
        setMessage2(null)
        setForm({
            email:"",
            password:"",
            fullName:""
        })
    }, [show])
    
    if (show === true ){
    return (
        <div className="flex flex-col justify-center items-center w-2/4 bg-white" style={{backgroundColor:'#FAFBFF'}}>
                <div style={{width:'388px'}}>
                <p className="textPrimary text-3xl font-semibold mb-8">Log in to Beam Space</p>
                
                <div className="w-full cursor-pointer bg-white rounded-md p-3 shadow-md font-semibold flex justify-center items-center mb-5">
                    <img className="mr-3" src={googleIcon} alt=""/>
                    Log in with Google
                </div>
                <div style={{backgroundColor:'#3A589B'}} className="w-full cursor-pointer text-white rounded-md p-3 shadow-md font-semibold flex justify-center items-center mb-8">
                    <img src={facebookLogo} className="mr-1" alt=""/>
                    Log in with Facebook 
                </div>

                <div className="flex items-center">
                    <hr className="w-1/4 mr-3"/>
                    <p className="text-gray-400">or login with your email</p>
                    <hr className="w-1/4 ml-3"/>
                </div>
                <p className="text-red-400 font-semibold">{message2}</p>
                <form onSubmit={handleLogin} action="">
                    <label className="flex mb-3 font-semibold" htmlFor="email">Email Address <p className='textPrimary font-bold'>*</p></label>
                    <input value={email} onChange={handleChange} className="mb-5 formInput shadow-md" type="text" name="email" id="email" placeholder="E.g name@gmail.com"/>
                    <label className="flex mb-3 font-semibold"  htmlFor="password">Password <p className='textPrimary font-bold'>*</p></label>
                    <input value={password} onChange={handleChange} className="formInput shadow-md mb-8" type="password" name="password" id="password" placeholder="Enter your password" />
                    <button type="submit" className="text-white font-semibold bgPrimary formButton shadow-md mb-8 shadow-red-400">Login</button>
                </form>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <NavLink to="/forgot-password"><p className="mb-5 font-semibold" style={{color:'#00ACEE'}}>Forgot Password?</p></NavLink>
                    
                    <p className="flex">Dont have an account? <button onClick={showRegister} to="/register"> <p className="font-semibold" style={{color:'#00ACEE'}} >Create an account</p></button> </p>
                </div>
                <Modal
                isOpen = {showModal}
                contentLabel = "Success"
                style={customStyles}
                overlayClassName="Overlay"
                onRequestClose={handleCloseModal}
                >

                    <div className="text-3xl font-semibold text-green-300 flex items-center">
                        <img src={success} className="mr-3" width="50px" alt=""/>
                        Register Success</div>
                    
                </Modal>
                <Modal
                isOpen = {showModalLogin}
                contentLabel = "Success"
                style={customStyles}
                overlayClassName="Overlay"
                onRequestClose={handleCloseModal}
                >

                    <div className="text-3xl font-semibold text-green-300 flex items-center">
                        <img src={success} className="mr-3" width="50px" alt=""/>
                        Login Success</div>
                    
                </Modal>
            </div>
            
    )
} else {
    return (
        <div className="flex flex-col justify-center items-center w-2/4 bg-white" style={{backgroundColor:'#FAFBFF'}}>
                <div style={{width:'388px'}}>
                <p className="textPrimary text-3xl font-semibold mb-8">Register Your Account</p>
                <p className="text-red-400">{message}</p>

                <form onSubmit={HandleRegister} action="">
                    <label className="flex mb-3 font-semibold" htmlFor="fullName">Name <p className='textPrimary font-bold'>*</p></label>
                    <input value={fullName} onChange={handleChange} className="mb-5 formInput shadow-md" type="text" name="fullName" id="fullName" placeholder="Full Name"/>
                    <label className="flex mb-3 font-semibold" htmlFor="email">Email Address <p className='textPrimary font-bold'>*</p></label>
                    <input value={email} onChange={handleChange} className="mb-5 formInput shadow-md" type="email" name="email" id="email" placeholder="E.g name@gmail.com"/>
                    <label className="flex mb-3 font-semibold"  htmlFor="password">Password <p className='textPrimary font-bold'>*</p></label>
                    <input value={password} onChange={handleChange} className="formInput shadow-md mb-8" type="password" name="password" id="password" placeholder="Password" />
                    <button type="submit" className="text-white font-semibold bgPrimary formButton shadow-md mb-8 shadow-red-400">Create an account</button>
                </form>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <NavLink to="/forgot-password"><p className="mb-5 font-semibold" style={{color:'#00ACEE'}}>Forgot Password?</p></NavLink>
                    
                    <p className="flex">Already have an account? <button id="toLogin" onClick={showLogin} > <p className="font-semibold" style={{color:'#00ACEE'}} >Log in here</p></button> </p>
                </div>
                <Modal
                isOpen = {showModal}
                contentLabel = "Success"
                style={customStyles}
                overlayClassName="Overlay"
                onRequestClose={handleCloseModal}
                >

                    <div className="text-3xl font-semibold text-green-300 flex items-center">
                        <img src={success} className="mr-3" width="50px" alt=""/>
                        Register Success</div>
                    
                </Modal>
            </div>
    )
}
}

export default Login
