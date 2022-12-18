import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";


function Buscar (busca) {
  const [post, setPost] = useState(null)
  useEffect(() => {
    axios.get("https://api.pokemontcg.io/v2/cards?q=name:"+busca+"*&page=1&pageSize=7").then((response) => {
      setPost(response.data);
    });
  }, [busca])
  return (
    <div class="d-flex justify-content-center">
        <div style={{position:'absolute', zIndex:'10'}}>
          <Table bordered hover size="sm" variant="dark" responsive="sm" style={{ cursor:'pointer'}}>
            <tbody>
              {post && post.data.map((item) => (
                  <tr>
                    <td style={{width:'58vh'}}>{item.name}</td>
                  </tr>                       
                ))}
              </tbody>
            </Table>
        </div>
    </div>
  );
}
export default Buscar