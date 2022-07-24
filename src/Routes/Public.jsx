import HomePage from '../Pages/HomePage'
import RegistroPage from '../Pages/RegistroPage'
import LoginPage from '../Pages/LoginPage'
import {
    Routes,
    Route
} from "react-router-dom"
import DetallePage from '../Pages/DetallePage';
import NotFound from '../Pages/NotFound';
import ProductosAlta from '../Pages/ProductosAlta';
import ProductosModificar from '../Pages/ProductosModificar';
import AuthContext from '../Context/AuthContext';
import Carrito from "../Pages/Carrito";
import {useState} from "react";

function Public() {
    const [cartItems, setCartItems] = useState([])

    return (
        <AuthContext.Consumer>
            {
                context=>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        {
                            !context.isLogin &&
                            <>
                                <Route path='/alta' element={<RegistroPage />} />
                                <Route path='/ingresar' element={<LoginPage />} />
                            </>
                        }
                        {
                            context.isLogin &&
                            <>
                                <Route path='/productos/alta' element={<ProductosAlta />}  />
                                <Route path='/productos/modificar/:id' element={<ProductosModificar />}  />
                            </>
                        }

                        <Route path='/producto/:id' element={<DetallePage />}  />
                        <Route path='*' element={<NotFound />} />
                        <Route path='/carrito' element={<Carrito cartItems={cartItems}/>} />
                    </Routes>
            }
        </AuthContext.Consumer>

    );
}

export default Public;
