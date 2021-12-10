import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchProductDetails,
  addToCart,
  removeFromCart,
  fetchAllExchangable
} from "../API calls/products";
import { sendRequest } from "../API calls/requests";
import Spinner from "../Components/Spinner";
import Error from "./Error";
import { approve, unapprove } from "../API calls/products";
import {Dropdown} from 'react-bootstrap'

const ProductDetails = ({ history }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [chosenProduct, setChosenProduct] = useState("");
  const [chosenProductId, setChosenProductId] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [priceDifference, setPriceDifference] = useState(0);
  const [requestSent, setRequestSent] = useState(false);
  const [requestRecieved, setRequestRecieved] = useState(false);

  //moderator deletion of product
  const approveProduct = async => {
    const data = { action: "active", productId: product._id };
    approve(data)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while approving product"));
  };

  //moderator deletion of product
  const deleteProduct = async => {
    unapprove(product._id)
      .then(() => (window.location = "/moderator_home"))
      .catch(() => console.log("Error while unapproving product"));
  };

  //adds to cart
  const add = (productId, navigate) => {
    addToCart(productId)
      .then(response => {
        if (response.status !== 200) {
          alert("Unable to add product to cart !");
        } else {
          setInCart(true);
          if (navigate) {
            history.push(`/checkout`);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const request = (prodId, exchangeId) => {
    console.log("In request Product Id : " + prodId);
    let sender = localStorage.getItem("username");
    let reciever = product.username;
    sendRequest(prodId, sender, reciever, priceDifference, exchangeId)
      .then(response => {
        if (response.status === 200) {
          setRequestSent(true);
          history.push(`/Home`);
        } else {
          console.log("ERROR");
          console.log(response);
          alert("Unable to send request");
        }
      })
      .catch();
  };

  const remove = productId => {
    removeFromCart(productId)
      .then(response => {
        if (response.status !== 200) {
          alert("Unable to remove product from the cart !");
        } else {
          setInCart(false);
        }
      })
      .catch(response => console.log(response));
  };

  useEffect(() => {
    fetchProductDetails(productId)
      .then(response => {
        setResponseRecieved(true);
        setProduct(response.data.data.product);
        setInCart(response.data.data.inCart)
        setRequestSent(response.data.data.sentRequest)
        setRequestRecieved(response.data.data.recievedRequest);
      })
      .catch(err => {
        setResponseRecieved(true);
        if (err.response.status === 406) {
          setError(true);
        }
      });
    
      fetchAllExchangable(localStorage.getItem("user_id"))//change this
        .then(response => {
          setMyProducts(
            response.data.data.filter(
              item =>
                item.transactionType === "exchange" && item.status === "active"
            )
          );
        })
        .catch(() => console.log("Error retrieving User Products from the db"));
  }, [productId, inCart, requestSent]);

  return (
    <div className="container">
      {/* When loading */}
      {!responseRecieved && !error && (
        <Spinner text="Fetching product details" />
      )}

      {/* If error */}
      {responseRecieved && error && (
        <Error title="Error while fetching." message="Product Unavailable." />
      )}

      {/* If no error */}
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

            {/* If user not logged in */}
            {localStorage.getItem("username") === null && (
              <div className="row">
                <button
                  className="col-5 col-md-4 col-lg-3 ms-3 btn btn-success "
                  onClick={() => history.push("/login")}
                >
                  Login to continue
                </button>
              </div>
            )}

            {/* if user is loggedin/normal/owner/exchange */}
            {product.username === localStorage.getItem("username") &&
              localStorage.getItem("userType") === "normal" &&
              product.transactionType === "exchange" && (
                <div className="row">
                  <button
                    className="col-5 col-md-4 col-lg-3 ms-3 btn btn-warning "
                    onClick={() =>
                      history.push({
                        pathname: `/requests/${productId}`,
                        state: {
                          name: product.productName,
                          price: product.price,
                          description: product.description,
                          image: product.images,
                        },
                      })
                    }
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

            {/* if loggedin/normal/owner/sell/active */}
            {product.username === localStorage.getItem("username") &&
              localStorage.getItem("userType") === "normal" &&
              product.transactionType === "sell" &&
              product.status !== "sold" && (
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

            {/* user loggedIn/normal/not owner/sell */}
            {product.transactionType === "sell" &&
              localStorage.getItem("userType") === "normal" &&
              product.username !== localStorage.getItem("username") && (
                <div className="row">
                  {/* NOT ADDED TO CART */}
                  {!inCart && product.status === "active" && (
                    <button
                      onClick={() => add(productId, false)}
                      className="col-5 col-md-4 col-lg-3 ms-3 btn btn-primary "
                    >
                      Add to cart
                    </button>
                  )}
                  {/* ADDED TO CART */}
                  {inCart && product.status === "active" && (
                    <button
                      onClick={() => remove(productId)}
                      className="col-5 col-md-4 col-lg-3 ms-3 btn btn-secondary "
                    >
                      Remove from cart
                    </button>
                  )}
                  {product.status === "active" && (
                    <button
                      className="col-5 col-md-4 col-lg-3 ms-3 btn btn-success "
                      onClick={() => add(productId, true)}
                    >
                      Checkout
                    </button>
                  )}
                </div>
              )}

            {/* user loggedIn/normal/not owner/exchange */}
            {!requestRecieved &&
              product.transactionType === "exchange" &&
              localStorage.getItem("userType") === "normal" &&
              product.username !== localStorage.getItem("username") && (
                <div className="row">
                  {!requestSent && <h6>Exchange with: </h6>}
                  {!requestSent ? (
                    <Dropdown className="">
                      <Dropdown.Toggle
                        variant="light"
                        className="btn-outline-dark"
                      >
                        {chosenProduct}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {myProducts.map(item => (
                          <Dropdown.Item
                            key={item._id}
                            onClick={() => {
                              setChosenProduct(item.productName);
                              setChosenProductId(item._id);
                              setPriceDifference(product.price - item.price);
                            }}
                          >
                            {/* {dropdownOff === "category" ? item.categoryName : item}{" "} */}
                            {item.productName}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <h6 className="text-danger">
                      You have already sent a request for this product.
                    </h6>
                  )}

                  {chosenProduct !== "" && priceDifference > 0 && (
                    <p style={{ marginTop: "5px", color: "red" }}>
                      You will have to pay additional Rs : {priceDifference}
                    </p>
                  )}

                  {chosenProduct !== "" && priceDifference < 0 && (
                    <p style={{ marginTop: "5px", color: "blue" }}>
                      You will recieve Rs : {-priceDifference}
                    </p>
                  )}
                  {!requestSent && (
                    <button
                      className="col-5 col-md-5 col-lg-4 ms-3 btn btn-primary "
                      onClick={() => request(productId, chosenProductId)}
                      disabled={
                        chosenProduct === "" || requestSent ? true : false
                      }
                    >
                      {requestSent ? "Request Sent" : "Send Request"}
                    </button>
                  )}
                  {requestSent && (
                    <div style={{ marginTop: "10px" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          history.push(
                            `/requests/sent/${localStorage.getItem("user_id")}`
                          )
                        }
                      >
                        View request
                      </button>
                    </div>
                  )}
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

            {/* user loggedIn/moderator */}
            {localStorage.getItem("userType") === "moderator" && (
              <div className="row mt-4 mb-5">
                <button
                  className="col-4 col-md-4 col-lg-3 ms-3 me-1 btn btn-primary "
                  onClick={() =>
                    history.push(`/products/${product._id}/updatePrice`)
                  }
                >
                  Update product
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
