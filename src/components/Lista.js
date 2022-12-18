import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import {useNavigate} from 'react-router-dom';


function Lista (post) {
    const navigate = useNavigate();
    const [irCarta, setIrCarta] = useState(null)
    if(irCarta !== null){
        navigate('/Card', { state: { carta: irCarta} })
    }
    console.log(post.data)
    if(post.data.length == 0) {
        return (
            <div>
                <div className="bkgd d-flex justify-content-center"> 
                    <span className= "display-2" style={{fontWeight: 'bold', paddingTop: '7.1vh',paddingBottom: '1vh',color:'white' }}>NO SE HAN ENCONTRADO RESULTADOS</span>        
                </div>
                <div className="bkgd d-flex justify-content-center">
                    <img src="https://media.tenor.com/B-I9jCO00-4AAAAj/pokemon-cubone.gif" style={{height:'70%' }}></img> 
                </div>

            </div>
        );
    }
    return (
        <div className="grid"> 
        {post && post.data.map((item) => (
            <a>
                <img className="card-image" onClick={() =>setIrCarta(item.id)} src={item.images.small} style={{cursor:'pointer'}} ></img>
            </a>
        ))}
        </div>
    );
}
export default Lista