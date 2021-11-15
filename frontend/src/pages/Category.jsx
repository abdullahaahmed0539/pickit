import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
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
    <div>
      <h1>These are the products.</h1>
      {products.map((item) => (
        <Card className="box" key={item._id} style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src={require(`${item.image}`).default}/> */}
          <Card.Body>
            <Card.Title>{item.productName}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Button
              onClick={() => history.push(`/products/${item._id}`)}
              variant="primary"
            >
              Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default withRouter(Products);
