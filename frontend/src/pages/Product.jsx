import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductDetails } from "../API calls/products";
import { Button } from "react-bootstrap";

const ProductDetails = ({ history }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProductDetails(productId)
      .then((response) => setProduct(response.data.data))
      .catch(() => console.log("Error while fetching product details"));
  }, [productId]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img className="col-md-11" src={product.images} alt="..." />
        </div>
        <div className="col-md-6">
          <div className="row">
            <h2>{product.productName}</h2>
          </div>
          <div className="row">
            <div>price: </div>
            <div>
              <h4>PKR {product.price}</h4>
            </div>
          </div>
          {product.username === localStorage.getItem("username") &&
            product.status === "active" && (
              <>
                <button
                  type="button"
                  className="btn btn-warning position-relative"
                  style={{ marginRight: "8px" }}
                  onClick={() =>
                    // props.history.push(`/products/${_id}`)
                    ""
                  }
                >
                  Requests
                  {product.requests.length !== 0 ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {product.requests.length}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
                <Button
                  onClick={() => {
                    history.push({
                      pathname: `/products/update_product`,
                      state: {
                        _id: product._id,
                        name: product.productName,
                        price: product.price,
                        imageLink: product.images[0],
                        description: product.description,
                        type: product.transactionType,
                        categoryid: product.categoryId,
                      },
                    });
                  }}
                  variant="primary"
                >
                  Edit
                </Button>
              </>
            )}
          {product.transactionType === "sell" &&
            product.username !== localStorage.getItem("username") && (
              <>
                <button className="col-md-3 mt-3 btn btn-primary">
                  Add to cart{" "}
                </button>
                <button
                  className="col-md-3 mt-3 btn btn-success"
                  style={{ marginLeft: "10px" }}
                >
                  Checkout
                </button>
              </>
            )}
          {product.transactionType === "exchange" &&
            product.username !== localStorage.getItem("username") && (
              <>
                <button className="col-md-3 mt-3 btn btn-primary">
                  Send request
                </button>
              </>
            )}

          <div className="row mt-5">
            <h5>About the product</h5>
            <p> {product.description}</p>
          </div>

          <div className="row mt-2">
            <h5>Seller details</h5>
            <p>
              {" "}
              Username: <strong>{product.username}</strong>
            </p>
          </div>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default withRouter(ProductDetails);
