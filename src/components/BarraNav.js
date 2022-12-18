import {useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {Navigate, useNavigate} from 'react-router-dom';
import logo from '../resources/Logo_PokemonTCG.png'

function BarraNav () {
    const navigate = useNavigate();
    const [boton, setBoton] = useState(false)
    const token  =  "5d2272df-24bd-4cdc-a681-4c8ae7722c85";
    if(localStorage.getItem("auth")!== token){
        return <Navigate to={"/Login"}/>
    }
    if(boton === true){
        localStorage.clear()
        return <Navigate to={"/Login"}/>
    }
    return (
        <Navbar expand="lg" variant="light" bg="dark">
            <Container>
                <Navbar.Brand onClick={()=>navigate('/')}><img src={logo} style={{width:'8%', cursor:'pointer'}}></img></Navbar.Brand>
                <Button variant="danger" onClick={() =>{setBoton(true)} } className="justify-content-end" style={{padding: '0.7vh'}}>Log Out</Button>
            </Container>
        </Navbar>       
    );
}
export default BarraNav