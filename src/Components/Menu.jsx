import React from "react"
import {Link} from "react-router-dom"
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import AuthContext from "../Context/AuthContext";
// function Producto({nombre,precio}){
function Menu(props){
    return(
            <>
                <AuthContext.Consumer>
                    {
                        context =>
                            <Navbar bg="light" expand="lg">
                                <Navbar.Brand href="#home">DR20222</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                                        {
                                            !context.isLogin &&
                                                <>
                                                    <Nav.Link as={Link} to="/ingresar">Ingresar</Nav.Link>
                                                    <Nav.Link as={Link} to="/alta">Registro</Nav.Link>
                                                </>
                                        }
                                        {
                                            context.isLogin &&
                                                <>
                                                    <Nav.Link onClick={context.logoutUser}>Salir</Nav.Link>
                                                </>
                                        }

                    <NavDropdown title="Productos" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/productos/alta">Alta</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                                {
                                    context.isLogin &&
                                        <div>Hola {context?.userInfo?.name}</div>
                                }
            </Navbar>
                    }
                </AuthContext.Consumer>
            </>
            
    )
}
export default Menu