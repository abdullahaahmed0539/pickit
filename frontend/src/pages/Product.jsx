import {useParams} from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const ProductDetails = ({history}) => {

    const {productId} = useParams();
    const [product,setProduct] = useState({});

    useEffect(()=>{
        const fetchProductDetails = async () => {
            const token = localStorage.getItem("token");
            const response  =  await axios.get(`http://localhost:5000/products/${productId}`,{headers: {
                Authorization: `Bearer ${token}`
            }});
            
            const prod = response.data.data;
            setProduct(prod);
        }
        fetchProductDetails()
    },[productId]);


    return ( 
        <div>
            <h1>{product.productName}</h1>
            <h2>{product.description}</h2>
            <h1> PKR {product.price}</h1>
        </div>
     );
}
 
export default withRouter(ProductDetails);