import React, {useContext, useState} from "react"
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import {Button,Form} from 'react-bootstrap'
import firebase from "../Config/firebase"
import AlertCustom from "../Components/AlertCustom";
import {loginMessage} from "../Util/errorMessage"
import logo from "../Images/add-to-cart.png";
import {Link, useNavigate} from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function LoginPage(){
    const history = useNavigate();
    const { register, handleSubmit } = useForm();
    const [alert,setAlert] = useState({variant:'',text:''})
    const context = useContext(AuthContext)
    const onSubmit = async (data)=>{
        console.log("data",data)
        try{
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email,data.password)
            console.log(responseUser.user.uid)

            if(responseUser.user.uid) {
                const user = await firebase.db.collection("usuarios")
                    .where("userId", "==", responseUser.user.uid)
                    .get()
                context.loginUser(user.docs[0].data())
                setAlert({variant:"success",text:"Bienvenido "+user.docs[0].data().name})
                history('/')
            }
        }catch(e){
            console.log(e.code)
            if(e.code==="auth/user-not-found"){

            }
            setAlert({variant:"danger",text:loginMessage[e.code] || "Ha ocurrido un error"})
        }
        
    } 
   
    return(
        <section className="vh-100 d-flex align-items-center justify-content-center" style={{backgroundColor:" white", minHeight: "100vh"}}>
            <div className="container py-5 h-100 w-100" style={{ maxWidth: '1000px'}} >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{borderRadius: "1rem",  boxShadow:" 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block" style={{backgroundColor: "#77C4EE",borderRadius:" 1rem 0 0 1rem"}}>
                                    <img src={logo} alt="login form" className="img-fluid" style={{borderRadius:" 1rem 0 0 1rem", marginTop:"50%"}} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Email" type="email" name="email" register={{...register("email", { required: true})}} />
                <Input label="Contraseña" type="password" name="password" register={{...register("password", { required: true})}} />
                <Button type="submit" variant="primary">Ingresar</Button>
                <AlertCustom {...alert} />
            </Form>

                                        <div className="w-100 text-center mt-2">
                                            ¿No tienes una cuenta? <Link to="/alta" style={{color: "rgb(228, 170, 35)"}}>Registrarse</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 

export default LoginPage