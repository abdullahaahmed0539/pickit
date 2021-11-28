import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProductDetails } from "../API calls/products";
import Spinner from "../Components/Spinner";
import Error from "./Error";
import {
  approve,
  unapprove,
} from "../API calls/products";

const ProductDetails = ({ history }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [responseRecieved, setResponseRecieved] = useState(false);

  const approveProduct = async  => {
    const data = { action: "active", productId: product._id };
    approve(data)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while approving product"));
  };

   const deleteProduct = async  => {
     unapprove(product._id)
       .then(() => (window.location = "/moderator_home"))
       .catch(() => console.log("Error while unapproving product"));
   };

  useEffect(() => {
    fetchProductDetails(productId)
      .then(response => {
        setResponseRecieved(true);
        setProduct(response.data.data);
      })
      .catch(err => {
        setResponseRecieved(true);
        if (err.response.status === 406) {
          setError(true);
        }
      });
  }, [productId]);

  return (
    <div className="container">
      {!responseRecieved && !error && (
        <Spinner text="Fetching product details" />
      )}
      {responseRecieved && error && (
        <Error title="Error while fetching." message="Product Unavailable." />
      )}
      {responseRecieved && !error && (
        <div className="row mt-5">
          <img
            className="col-12 col-md-4 mb-3"
            src={product.images}
            alt="..."
            style={{ height: "100%" }}
          />
          <div className="col-12 col-md-6 offset-md-1">
            <div className="row">
              <h2 className="col-12">{product.productName}</h2>
            </div>
            <div className="row mb-4">
              <div className="col-12">price: </div>
              <div className="col-12">
                <h4>PKR {product.price}</h4>
              </div>
            </div>

            {product.username === localStorage.getItem("username") &&
              localStorage.getItem("userType") === "normal" &&
              product.transactionType === "exchange" && (
                <div className="row">
                  <button
                    className="col-5 col-md-4 col-lg-3 ms-3 btn btn-warning "
                    onClick={() => {
                      /* props.history.push(`/products/${_id}`)}*/
                    }}
                  >
                    Requests{" "}
                    {product.requests.length !== 0 ? (
                      <span className="badge rounded-pill bg-danger">
                        {product.requests.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                  <button
                    className="col-5 col-md-4 col-lg-3 ms-3 btn btn-primary"
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
                  </button>
                </div>
              )}

            {product.username === localStorage.getItem("username") &&
              localStorage.getItem("userType") === "normal" &&
              product.transactionType === "sell" && (
                <div className="row">
                  <button
                    className="col-5 col-md-5 col-lg-4 ms-3 btn btn-primary "
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
                  </button>
                </div>
              )}

            {product.transactionType === "sell" &&
              localStorage.getItem("userType") === "normal" &&
              product.username !== localStorage.getItem("username") && (
                <div className="row">
                  <button className="col-5 col-md-4 col-lg-3 ms-3 btn btn-primary ">
                    Add to cart
                  </button>
                  <button className="col-5 col-md-4 col-lg-3 ms-3 btn btn-success ">
                    Checkout
                  </button>
                </div>
              )}

            {product.transactionType === "exchange" &&
              localStorage.getItem("userType") === "normal" &&
              product.username !== localStorage.getItem("username") && (
                <div className="row">
                  <button className="col-5 col-md-5 col-lg-4 ms-3 btn btn-primary ">
                    Send request
                  </button>
                </div>
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

            {localStorage.getItem("userType") === "moderator" && (
              <div className="row mt-4">
                <button
                  className="col-4 col-md-4 col-lg-3 ms-3 me-1 btn btn-primary "
                  onClick={() =>
                    history.push(`/products/${product._id}/updatePrice`)
                  }
                >
                  Update price
                </button>
                <button
                  className="col-3 col-md-3 col-lg-3 me-1 btn btn-success "
                  onClick={() => approveProduct(product._id)}
                >
                  Approve
                </button>
                <button
                  className="col-3 col-md-3 col-lg-3 btn btn-danger "
                  onClick={() => deleteProduct(product._id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(ProductDetails);
