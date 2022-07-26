import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "./AuthContext";

export default function AuthProvider(props) {

    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") || false)
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || {})
    // JSON.parse levanta un string y lo tranforma en un objeto
    const navigate = useNavigate()

    // Si el usuario está logueado
    const loginUser = (user) => {
        setIsLogin(true) // setIsLogin a true porque el usuario está logueado
        // we have a user...therefore we can store the user in localstorage
        localStorage.setItem("isLogin", true)
        // JSON.stringify is needed because localStorage doesn't allow me to save an object on localStorage
        localStorage.setItem("userInfo", JSON.stringify(user))
        //once is storing in local storage, set user as UserInfo
        setUserInfo(user)
    }

    // is user is logOut
    const logoutUser = () => {  // no necesito pasar el user como parametro porque ya no esta logueado, ergo no hay usuario
        setIsLogin(false)
        localStorage.removeItem("isLogin")
        localStorage.removeItem("userInfo")
        setUserInfo({})
        navigate("/")
    }

    return (
        <AuthContext.Provider
            value={{    // doble llave {{ }} porque quiero escribir javascript en un archivo jsx
                isLogin,
                loginUser,
                logoutUser,
                userInfo
            }}
            >
            {props.children}
        </AuthContext.Provider>
    )
}