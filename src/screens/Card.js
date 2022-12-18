import React, {useState, useEffect} from "react";
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './Card.css';
import {Navigate, useLocation} from 'react-router-dom';
import BarraNav from "../components/BarraNav";

function Card() {
  const {state} = useLocation();
  const { carta } = state;
  console.log(carta)
  const [post, setPost] = useState(null)
  useEffect(() => {
    axios.get(`https://api.pokemontcg.io/v2/cards/${carta}`).then((response) => {
      setPost(response.data.data);
    });
  }, [])
  /////// Valida si se tiene un token que coincide
  const token  =  "5d2272df-24bd-4cdc-a681-4c8ae7722c85";

  if(localStorage.getItem("auth")!== token){
    return <Navigate to={"/Login"}/>
  }

  if(!post) return null

  return (
    <>
      <BarraNav/>
      <body className={post.rarity}>
        <div className="card-select-main">            
          <div className={post.types[0]}>
            <div className="wraper">
              <div className="div-1">
                <div className="content-card"> 
                    <img className="card-select-image" src={post.images.small}/>
                </div>
              </div>
              <div className="div-2">
                <div className="content-card-info">
                    <nav className="card-info-nav bg-transparent" style={{height:"8vh"}}>
                      <Row className="h-100">
                        <Col className="text-start" column lg={9}><span>{post.name}</span></Col>
                        <Col className="text-end" column lg={2}><span style={{fontSize:"0.5em", color:"grey", marginLeft:'40%'}}>&nbsp;HP&nbsp;{post.hp}&nbsp;</span></Col>
                        <Col className="text-end" column lg={1}><img src={require(`../resources/types/${post.types[0]}.png`)} alt={post.types} style={{width:'4vh',marginRight:'100%'}}/></Col>
                      </Row>
                    </nav>                    
                  <div className="card-info-subtitle" style={{borderBottom:'1px solid black'}}>
                    <span>{post.supertype} - {post.subtypes.join(', ')}</span>
                  </div>
                  <div className="card-info-price" style={{borderBottom:'1px solid black', paddingTop:'1.2%', paddingBottom:'1%'}}>
                    {post.tcgplayer ? (
                      <div className="card-info-price-tcgplayer">
                        <a href={post.tcgplayer.url}><span>TCG-Player</span></a><br/>
                        {Object.keys(post.tcgplayer.prices).map((priceType) => (
                          <>
                            <span>{priceType}:</span>
                            <div className="card-info-price-tcgplayer-price">
                              {Object.keys(post.tcgplayer.prices[priceType]).map((price) => (
                                price !== 'directLow' ? (
                                  <span>{price}: ${post.tcgplayer.prices[priceType][price]}</span>
                                ) : null
                              ))}
                            </div>
                          </>
                        ))}                  
                      </div>
                    ) : null}
                    {post.cardmarket ? (
                      <div className="card-info-price-cardmarket" style={{paddingTop:'1%'}}>
                        <a href={post.cardmarket.url}><span>Card Market</span></a>
                        <div className="card-info-price-cardmarket-price">
                          <span>Trend Price: ${post.cardmarket.prices.trendPrice}</span>
                          <span>1 Day Avegare: ${post.cardmarket.prices.avg1}</span>
                          <span>7 Day Avegare: ${post.cardmarket.prices.avg7}</span>
                          <span>30 Day Avegare: ${post.cardmarket.prices.avg30}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="card-info-description" style={{borderBottom:'1px solid black', paddingBottom:'1.2%', paddingTop:'1%'}}>
                    <span>Artist</span>
                    <span>Rarity</span>
                    <span>Set</span>
                    <span>Number</span>
                    <span>{post.artist}</span>
                    <span>{post.rarity}</span>
                    <span>{post.set.name}</span>
                    <span>{post.number}/{post.set.printedTotal}</span>
                  </div>

                </div>
              </div>
            </div>
          </div>     
        </div>
      </body>
    </>  
  );
}
export default Card

