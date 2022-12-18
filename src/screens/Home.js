import React, {useState, useEffect} from "react";
import logo from '../resources/Logo_PokemonTCG.png'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../App.css';
import Lista from "../components/Lista";
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom';
import BarraNav from "../components/BarraNav";
function Home() {
  const navigate = useNavigate();

  const [irCarta, setIrCarta] = useState(null)

  const [nCarta, setNCarta] = useState("")

  const [irBusqueda, setIrBusqueda] = useState("")

  
  const [post, setPost] = useState(null)
  useEffect(() => {(
    async () =>{
    axios.get("https://api.pokemontcg.io/v2/cards?orderBy=-tcgplayer.prices.holofoil.market&page=1&pageSize=35").then((response) => {
      setPost(response.data);
    });
  }
  )();
  }, [])

  const [alto, setAlto] = useState(null)
  useEffect(() => {(
    async () =>{
    axios.get("https://api.pokemontcg.io/v2/cards?orderBy=-tcgplayer.prices.1stEditionHolofoil.high&page=1&pageSize=12").then((response) => {
      setAlto(response.data.data);
    });

  }
  )();
  }, [])

  const [busca, setBusca] = useState("")

  const [busqueda, setBusqueda] = useState(null)
  useEffect(() => {(
    async () =>{
      if(busca !==""){
        axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${busca}*&page=1&pageSize=7`).then((response) => {
          setBusqueda(response.data.data);
      });
    }
    else{
      setBusqueda("")
    }
    
  }
  )();
    
  }, [busca])



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 5,
    responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
  };
  if(nCarta!=""){
    navigate('/Card', { state: { carta: nCarta} });
  }

  if(irBusqueda!=""){
    navigate('/List', { state: { carta: irBusqueda} });
  }

  if(irCarta !== null){
    navigate('/Card', { state: { carta: irCarta} })
  }
  /////// Valida si se tiene un token que coincide
 

  if(!post) return null
  return (
    <>
      <div className="bkgd">
        <BarraNav/>
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '6vh'}}>
          <img className="tcgicon" src={logo}/>  
        </div> 
        <div className="main_search h-100">
          <div class="d-flex justify-content-center h-100" style={{paddingLeft:'5%'}}>
            <div class="search">
              <input class="search_input" type="text" name="" onKeyUp={(event) =>{ if(event.key === 'Enter') setIrBusqueda(event.target.value)}} onChange={(event) => setBusca(event.target.value)} placeholder="Search here..."/>
              <a href="#" class="search_icon"><i class="fa fa-search" ></i></a>
            </div>
            <img src="https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif" alt="Pikachu running" style={{width:'5%'}}/>
          </div>
        </div>
        <div class="d-flex justify-content-center">
            <div style={{position:'absolute', zIndex:'10'}}>
              <Table bordered hover size="sm" variant="dark" responsive="sm" style={{ cursor:'pointer'}}>
                <tbody>
                  {busqueda && busqueda.map((item) => (
                      <tr>
                        <td style={{width:'58vh'}} onClick={()=> {setNCarta(item.id)}}>{item.name} {item.rarity} ({item.id})</td>
                      </tr>                       
                    ))}
                </tbody>
              </Table>
            </div>
          </div>   
          <div className="container-carousel" style={{zIndex:'-1'}}>
          <h3 className="text-center" style={{paddingBottom:'1vh'}}>Cartas primera edición más costosas</h3> 
            <Slider {...settings}>
              {alto && alto.map((item) => (
                <div className="card-position">
                  <img className="card-image" onClick={() =>setIrCarta(item.id)} src={item.images.small} style={{cursor:'pointer'}} alt="Pokemon Card" ></img>
                </div>
              ))}
            </Slider>
          </div>

          <div>
            <h3 className="text-center" style={{color:'white', paddingBottom:'1vh'}}>Mix de cartas más valiosas</h3>    
            <Lista {...post}/> 
          </div>         
      </div>
      <div className="bkgd" style={{height:'5vh'}}>

      </div>
    </>
  );
}
export default Home