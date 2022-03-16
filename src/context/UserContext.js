import React, {createContext,useReducer} from 'react'

export const UserContext = createContext()

const initialState = {
    isLogin: localStorage.isLogin || false,
    user: {},
}

const reducer = (state,action) => {
    const {type,payload,loginId} = action
    switch(type){
        case 'LOGIN':
            localStorage.setItem("token",payload.token)
            localStorage.setItem('isLogin',true)
            return{
                
            }
        case 'USER_SUCCESS':
            return{
                isLogin:true,
                user:payload,
            }
        case 'LOGOUT':
            localStorage.clear();
            return{
                isLogin:false,
                user:{}
            }
                case "AUTH_ERROR":
                    localStorage.clear();
                    return {
                        isLogin: false,
                        user: {},
                    };
        default:
            throw new Error()
    }
}

export const UserContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer, initialState)
    
    return (
        <UserContext.Provider value={[state,dispatch]}>
            {children}
        </UserContext.Provider>
    )
}