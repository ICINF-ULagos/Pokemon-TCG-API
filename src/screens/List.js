import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Lista from "../components/Lista";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../App.css';
import BarraNav from "../components/BarraNav";
import logo from '../resources/Logo_PokemonTCG.png'

function List (){
    const navigate = useNavigate();
    const {state} = useLocation();
    const { carta } = state;
    const [post, setPost] = useState(null)
    useEffect(() => {(
            async () =>{
            axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${carta}*`).then((response) => {
            setPost(response.data);
            });
        })();
    }, [])
    if(!post) return null
    return (
        <>
            <BarraNav />
            <div className="bkgd"> 
                <div style={{paddingTop:'2vh'}}> 
                    <h2 className="text-center" style={{color:'white', paddingTop:'2vh'}}>Resultados para {carta} </h2> 
                    <Lista {...post} />
                </div> 
            </div>  
            <div className="bkgd" style={{height: '50vh'}}>
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10vh'}}>
                    <img className="tcgicon" onClick={()=>navigate('/')} style={{cursor:'pointer'}} src={logo}/>  
                </div>     
            </div> 
        </>
    )   
}

export default List