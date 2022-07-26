import React,{useState,useEffect} from "react"
import Producto from "./Producto"
import {getAllProductos} from '../Services/productosServices'
import Row from "react-bootstrap/Row"
import Loading from "./Loading"
function Productos(){
    const [loading,setLoading] = useState(true)
    const [productos,setProductos] = useState([])
    const [buscar,setBuscar] = useState('ipod')
    //Equivalente a componentDidMount
    useEffect(
        ()=>{
                const request = async ()=>{
                    try{
                        const response = await getAllProductos(buscar)
                        console.log(response)
                        setProductos(response)
                        setLoading(false)
                    }catch(e){
                        console.log(e)
                    }
                    
                }
                request()
        },
        [buscar]
    )
    const handleChange = (event)=>{
        const value = event.target.value
        setBuscar(value)
    }
    const titulo = "Listado de productos Componente funcion"
    return(
        <Loading loading={loading} configuration={{variant:"danger"}}>
            <div>
                <h1>{titulo}</h1>
                <input value={buscar} onChange={handleChange}></input>
                <Row>
                    {productos.map((productoData,index)=><Producto key={productoData.id} data={productoData.data()} id={productoData.id} />)}
                </Row>
            </div>
        </Loading>
    )
}

export default Productos
