import React,{useState,useEffect} from "react"
import { Card } from "react-bootstrap"
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
            <Card>
                <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <img src={producto.imgUrl} />
                    <Card.Text>$ {producto.price}</Card.Text>
                    <Card.Text>{producto.description}</Card.Text>
                </Card.Body>
            </Card>
        </Loading>
    )
    

} 

export default DetallePage