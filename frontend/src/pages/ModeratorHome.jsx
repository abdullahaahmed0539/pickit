import { useState,useEffect } from "react";
import axios from 'axios';
import { Card, Button,Image,Container } from "react-bootstrap";
import { withRouter } from 'react-router-dom';


const ModeratorHome = ({history}) => {

    const [products,setProducts] = useState([]);

    useEffect( () =>{
      const fetchUnapprovedProducts = async ()=>{
        const token = localStorage.getItem("token");
        const response  = await axios.get(`http://localhost:5000/products/unapproved`,{headers: {
          Authorization: `Bearer ${token}`
        }});
        
        const prod = response.data.data;
        const exchangeable = prod.filter(item=> item.transactionType==="exchange");
        setProducts(exchangeable);
        console.log(response);
      }
      fetchUnapprovedProducts()
      },[]);

    const approveProduct = async (productId)=> {
        console.log("Approving Product " + productId);
        
        const updatedPendingProducts = products.filter(prod => prod._id!==productId);

        //Creating the data object for request body
        const data={
            action: "active",
            productId: productId
        };

        setProducts(updatedPendingProducts);

        const response  = await axios.post(`http://localhost:5000/products/approve`,data,{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }});

        if(response.status === 200 && response.data)
            {
                console.log("success");
    
                console.log(response);

                window.location="/moderator_home";
            }
    }

    const deleteProduct = async (productId)=> {
        console.log("Deleting Product " + productId);
        
        const updatedPendingProducts = products.filter(prod => prod._id!==productId);


        setProducts(updatedPendingProducts);
        const token = localStorage.getItem("token");

        const response  = await axios.delete(`http://localhost:5000/products/${productId}`,{headers: {
            Authorization: `Bearer ${token}`
        }});

        if(response.status === 200 && response.data)
        {
            console.log("success");
            console.log(response);

            window.location="/moderator_home";
        }
    }


    return ( 
    <div>
        <Container>

           
            <h1>Welcome Moderator </h1>

            {products.length===0 && <h2>No pending products in your category yet</h2>}
            {products.length!==0 && <h3><i>Kindly process these products</i></h3>}
            {products.map(item=>
                <Card className="box" key={item._id} style={{ width: '24rem', marginTop: "20px", marginLeft: "20px" }}>
                <Image src={item.images[0]} rounded />
                <Card.Body>
                    <Card.Title>{item.productName}</Card.Title>
                    <Card.Text>
                    Description : {item.description} <br/> 
                    <b>Price : {item.price} </b>
                    </Card.Text>
                    <Button className="btn btn-secondary" onClick={() => history.push(`/products/${item._id}/updatePrice`)} variant="primary">Edit Price</Button>
                    <Button onClick={()=> approveProduct(item._id)} style={{marginLeft: "5px"}} variant="primary">Approve</Button>
                    <Button className="btn btn-danger" onClick={()=>deleteProduct(item._id)} style={{marginLeft: "5px"}} variant="primary">Reject</Button>


                </Card.Body>
                </Card>
            )}
        </Container>

    </div> );
}
 
export default withRouter(ModeratorHome);