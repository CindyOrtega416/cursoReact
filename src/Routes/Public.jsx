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
function Public() {
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
                    </Routes>
            }
        </AuthContext.Consumer>

    );
}

export default Public;
