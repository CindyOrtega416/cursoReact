import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import Menu from './Components/Menu';
import Public from './Routes/Public';
import Container from "react-bootstrap/Container"
import AuthProvider from "./Context/AuthProvider";
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
