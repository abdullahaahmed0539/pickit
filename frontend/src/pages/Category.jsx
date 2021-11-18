import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Products = ({ history }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://localhost:5000/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const prod = response.data.data.categoryProducts;
      setProducts(prod);
    };
    const token = localStorage.getItem("token");
    fetchProducts();
  }, [categoryId]);

  return (

    <div className="grid container mt-4">
     <div className="row">
       
      {products.map(
        (product) => (
          <div className='col-md-3 mb-4' key={product._id}>
          <div className="card">
            <img src={`${product.images[0]}`} className="card-img-top"  alt="..." />
            <div className="card-body">
              <h5 className="card-title"><strong>{product.productName.charAt(0).toUpperCase() + product.productName.slice(1)}</strong></h5>
              <p className="card-text">PKR <strong>{product.price.toFixed(2)}</strong></p>
              <p className="card-text">Available for <strong style={{color: '#198754'}}>{product.transactionType === 'sell' ? 'Purchase' : 'Exchange'}</strong></p>
              <Button className="btn  btn-primary" onClick={() => history.push(`/products/${product._id}`)}>Explore</Button>
            </div>
          </div>
          </div>
        )
      )}
     </div>
     
    </div>


    // <div>
    //   {products.map((item) => (
    //     <Card className="box" key={item._id} style={{ width: "18rem" }}>
    //       {/* <Card.Img variant="top" src={require(`${item.image}`).default}/> */}
    //       <Card.Body>
    //         <Card.Title>{item.productName}</Card.Title>
    //         <Card.Text>{item.description}</Card.Text>
    //         <Button
    //           onClick={() => history.push(`/products/${item._id}`)}
    //           variant="primary"
    //         >
    //           Details
    //         </Button>
    //       </Card.Body>
    //     </Card>
    //   ))}
    // </div>
  );
};

export default withRouter(Products);
