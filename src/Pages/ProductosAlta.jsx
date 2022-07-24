import React from "react"
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import {Button,Form} from 'react-bootstrap'
import firebase from "../Config/firebase"

function ProductosAlta(){


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data)=>{
        console.log("data",data)
        try{
            const document = await firebase.db.collection("productos")
            .add({
                name:data.name,
                price:data.price,
                description:data.description
            })
            console.log(document)
        }catch(e){
            console.log(e)
        }
        
    }


    return(
        <div className="">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Nombre" name="name" register={{...register("name", { required: true, minLength:3 })}} />
                <div>
                    {errors.name?.type==="required" && <span>El campo es obligatorio</span>}
                    {errors.name?.type==="minLength" && <span>Debe introducir al menos 3 caracteres</span>}
                </div>
                <Input label="Precio" name="price" register={{...register("price", { required: true})}} />
                <div>
                    {errors.lastname && <span>El campo es obligatorio</span>}
                </div>
                <Input label="Descripcion" type="text" name="description" register={{...register("description", { required: true})}} />
                <Button type="submit" variant="primary">Guardar</Button>
            </Form>
        </div>
    )
} 

export default ProductosAlta