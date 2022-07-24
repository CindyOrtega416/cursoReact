import React,{Component} from "react"
import Producto from "./Producto"

class Productos extends Component{
    constructor(){
        super()
        this.state={
            productos:[],
            loading:true
            
        }
    }
    componentDidMount(){
        //Buscamos datos en la base de datos
        setTimeout(()=>{
            this.setState({
                productos:[
                    {
                        nombre:"Moto g",
                        precio:1000
                    },
                    {
                        nombre:"Moto z",
                        precio:1500
                    },
                    {
                        nombre:"iPhone 13",
                        precio:2000
                    },
                ],
                loading:false
            })
        },2000)
    }
    componentDidUpdate(prevProps,prevState){
        console.log("componentDidUpdate",prevProps,prevState)
    }
    handleClick=()=>{
        this.setState({
            productos:[
                {
                    nombre:"Moto g",
                    precio:1000
                }
            ]
        })
    }
    render(){
        const titulo = "Listado de productos"
        if(this.state.loading){
            return(<div>Cargando...</div>)
        }else{
            return(
                <div>
                    <h1>{titulo}</h1>
                    {this.state.productos.map(productoData=><Producto nombre={productoData.nombre} precio={productoData.precio} />)}
                    <button onClick={this.handleClick}>Filtrar</button>
                </div>
            )
        }
        
    }
}

export default Productos

// function (producto){
//     return <Producto nombre={producto.nombre} precio={producto.precio} />
// }