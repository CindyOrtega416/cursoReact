import React,{useEffect, useState} from "react"
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import {Form} from 'react-bootstrap';
import firebase from "../Config/firebase";
import logo from '../Images/add-to-cart.png';
import ButtonWithLoading from "../Components/ButtonWithLoading";
import {Link, useNavigate} from "react-router-dom";


function RegistroPage(){
    const history = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading,setLoading] = useState(false)
    const onSubmit = async (data)=>{
        setLoading(true)
        console.log("data",data)
        try{
            const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email,data.password)
            console.log(responseUser.user.uid)
            if(responseUser.user.uid){
                console.log("responseUser")
                const document = await firebase.db.collection("usuarios")
                .add({
                    name:data.name,
                    lastname:data.lastname,
                    userId:responseUser?.user?.uid
                })
                history('/')
                console.log(document)
                setLoading(false)
            }
        }catch(e){
            console.log(e)
            setLoading(false)
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
                                        <h2 className="text-center mb-4">Registrarse</h2>
            <Form onSubmit={handleSubmit(onSubmit)} method="POST">
                <Input label="Nombre" name="name" register={{...register("name", { required: true, minLength:3 })}} />
                <div>
                    {errors.name?.type==="required" && <span>El campo es obligatorio</span>}
                    {errors.name?.type==="minLength" && <span>Debe introducir al menos 3 caracteres</span>}
                </div>
                <Input label="Apellido" name="lastname" register={{...register("lastname", { required: true})}} />
                <div>
                    {errors.lastname && <span>El campo es obligatorio</span>}
                </div>
                <Input label="Email" type="email" name="email" register={{...register("email", { required: true})}} />
                <Input label="Contraseña" type="password" name="password" register={{...register("password", { required: true})}} />
                <ButtonWithLoading loading={loading}>Registrarme</ButtonWithLoading>
            </Form>

                                        <div className="w-100 text-center mt-2">
                                            ¿Ya tienes una cuenta? <Link to="/ingresar" style={{color: "rgb(228, 170, 35)"}}>Inicia sesión</Link>
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

export default RegistroPage