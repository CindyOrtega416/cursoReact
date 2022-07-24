import React,{useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import Loading from "../Components/Loading"
import {getByIdProductos} from "../Services/productosServices"

function DetallePage() {
    const {id} = useParams()
    console.log("Id",id)
    const [loading,setLoading] = useState(true)
    const [producto,setProducto] = useState({})
    useEffect(
        ()=>{
            try{
                const request = async ()=>{
                    const response = await getByIdProductos(id)
                    console.log("response",response.data())
                    setLoading(false)
                    setProducto(response.data())
                }
                request()
            }catch(e){
                console.log(e)
            }
            
        },
        [id]
    )
    return(
        <Loading loading={loading}>
            <div className="">
                <h1>{producto.name}</h1>
                <p>$ {producto.price}</p>
                <p> {producto.description}</p>
            </div>
        </Loading>
    )
    

} 

export default DetallePage