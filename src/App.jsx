import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import Menu from './Components/Menu';
import Public from './Routes/Public';
import Container from "react-bootstrap/Container"
import AuthProvider from "./Context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  
  return (  
    <Router>
        <AuthProvider>
          <Menu />
          <Container>
          <Public />
          </Container>
          Footer
        </AuthProvider>
    </Router>
  );
}

export default App;
