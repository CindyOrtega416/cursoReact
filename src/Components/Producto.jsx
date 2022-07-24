import React from "react"
import {Link} from "react-router-dom"
import {Card,Button,Col} from 'react-bootstrap'
import AuthContext from "../Context/AuthContext";
// function Producto({nombre,precio}){
const style = {
    card:{ width: '18rem' }
}
function Producto(props){
    const {data,id} = props
    console.log(data)

    
    return(
        <AuthContext.Consumer>
            {
                context =>
                    <Col xs={12} sm={6} lg={4} xxl={3}>
                    <Card >
                        <Card.Img variant="top" src={data.thumbnail} />
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                                $ {data.price}
                            </Card.Text>
                            <Button as={Link} to={'/producto/'+id} variant="primary">Ver Detalle</Button>
                            {
                                context.isLogin &&
                                <Button as={Link} to={'/productos/modificar/'+id} variant="primary">Modificar</Button>
                            }

                </Card.Body>
            </Card>
        </Col>
            }
        </AuthContext.Consumer>
            
    )
}
export default Producto