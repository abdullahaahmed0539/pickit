import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ProductDetails = ({ history }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const prod = response.data.data;
      setProduct(prod);
    };
    fetchProductDetails();
  }, [productId]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
            <img className='col-md-11' src={product.images} alt='...'/>
        </div>
        <div className="col-md-6">
          <div className="row">
            <h2>{product.productName}</h2>
          </div>
          <div className="row">
              <div>price: </div>
            <div><h4>PKR {product.price}</h4></div>
          </div>
          {product.transactionType === 'sell' && product.status === 'active' && <>
            <button className='col-md-3 mt-3 btn btn-primary'>Add to cart </button>
            <button className='col-md-3 mt-3 btn btn-success'style={{marginLeft:'10px'}}>Checkout</button>
            </>}
           {product.transactionType === 'exchange' && <>
            
            </>}
          <div className="row mt-5">
            <h5>About the product</h5>
            <p> {product.description}</p>
          </div>

          <div className="row mt-2">
            <h5>Seller details</h5>
            <p> Username: <strong>{product.username}</strong></p>
          </div>
            
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default withRouter(ProductDetails);
