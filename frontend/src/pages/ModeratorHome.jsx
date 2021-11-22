import { useState, useEffect } from "react";
import { Card, Button, Image, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  fetchPendingProducts,
  approve,
  unapprove,
} from "../API calls/products";

const ModeratorHome = ({ history }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPendingProducts()
      .then((response) => setProducts(response))
      .catch(() => console.log("Error while fetching unapproved products"));
  }, []);

  const approveProduct = async (productId) => {
    const data = { action: "active", productId: productId };
    approve(data)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while approving product"));
  };

  const deleteProduct = async (productId) => {
    const updatedPendingProducts = products.filter(
      (prod) => prod._id !== productId
    );
    setProducts(updatedPendingProducts);
    unapprove(productId)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while unapproving product"));
  };

  return (
    <div>
      <Container>
        <h1>Welcome Moderator </h1>
        {products.length === 0 && (
          <h2>No pending products in your category yet</h2>
        )}
        {products.length !== 0 && (
          <h3>
            <i>Kindly process these products</i>
          </h3>
        )}
        {products.map((item) => (
          <Card
            className="box"
            key={item._id}
            style={{ width: "24rem", marginTop: "20px", marginLeft: "20px" }}
          >
            <Image src={item.images[0]} rounded />
            <Card.Body>
              <Card.Title>{item.productName}</Card.Title>
              <Card.Text>
                Description : {item.description} <br />
                <b>Price : {item.price} </b>
              </Card.Text>
              <Button
                className="btn btn-secondary"
                onClick={() =>
                  history.push(`/products/${item._id}/updatePrice`)
                }
                variant="primary"
              >
                Edit Price
              </Button>
              <Button
                onClick={() => approveProduct(item._id)}
                style={{ marginLeft: "5px" }}
                variant="primary"
              >
                Approve
              </Button>
              <Button
                className="btn btn-danger"
                onClick={() => deleteProduct(item._id)}
                style={{ marginLeft: "5px" }}
                variant="primary"
              >
                Reject
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default withRouter(ModeratorHome);
