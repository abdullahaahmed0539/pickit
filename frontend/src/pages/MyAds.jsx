import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import Spinner from "../Components/Spinner";

const MyAds = (props) => {
  const { userId } = useParams();
  const [listedProducts, setListedProducts] = useState([]);

  const statusColor = (status) => {
    if (status === "active") {
      return "#198754";
    } else if (status === "rejected") {
      return "#dc3545";
    } else if (status === "pending") {
      return "#0d6efd";
    } else if (status === "sold") {
      return "#fd7e14";
    }
  };

  useEffect(() => {
    const fetchMyProducts = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/users/${userId}/get_products`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const myProducts = response.data.data.Products;
      setListedProducts(myProducts);
    };
    fetchMyProducts();
  }, [userId]);

  if (listedProducts.length === 0) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className=" container">
          <div className="row">
            <div className="col-md-4 mt-3 mb-4 ">
              <Button
                onClick={() => props.history.push(`/products/create_new`)}
                variant="primary"
                className="btn btn-lg mb-3"
              >
                Add product
              </Button>
            </div>
          </div>
          <h2>All products you have listed</h2>
        </div>
        {listedProducts
          .map((item) => (
            <div key={item._id} className=" container card">
              <div className="row g-0">
                <div className="col-md-3 mt-3 mb-3 ">
                  <img
                    src={item.images[0]}
                    className="img-fluid rounded-start "
                    onClick={() => props.history.push(`/products/${item._id}`)}
                    alt="..."
                    style={{ height: "10em", cursor: "pointer" }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="row">
                      <h5
                        className="card-title col-md-12"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          props.history.push(`/products/${item._id}`)
                        }
                      >
                        <strong>
                          {item.productName.charAt(0).toUpperCase() +
                            item.productName.slice(1)}
                        </strong>
                      </h5>

                      <div className="card-text col-md-12">
                        <strong>PKR {item.price.toFixed(2)}</strong>
                      </div>

                      <div className="card-text col-md-12">
                        <small>
                          Date posted:{" "}
                          {`${new Date(item.date).getDate() + 1}/${
                            new Date(item.date).getMonth() + 1
                          }/${new Date(item.date).getFullYear()}`}
                        </small>
                      </div>

                      <div className="card-text col-md-12">
                        <small>
                          <strong
                            className=""
                            style={{ color: statusColor(item.status) }}
                          >
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                          </strong>
                        </small>
                      </div>
                    </div>

                    <div className="col-md-12 mt-3">
                      <div className="row">
                        <div className="col-md-1 ">
                          <button
                            type="button"
                            className="btn btn-warning position-relative"
                            onClick={() =>
                              // props.history.push(`/products/${item._id}`)
                              ""
                            }
                          >
                            Requests
                            {item.requests.length !== 0? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                              {item.requests.length}
                            </span>: ''}
                          </button>
                        </div>

                        <div
                          className="col-md-1 "
                          style={{ marginLeft: "28px" }}
                        >
                          <Button
                            onClick={() =>
                              props.history.push(`/products/${item._id}`)
                            }
                            variant="success"
                          >
                            Details
                          </Button>
                        </div>

                        <div
                          className="col-md-1 "
                          style={{ marginLeft: "2px" }}
                        >
                          <Button
                            onClick={() => {
                              props.history.push({
                                pathname: `/products/update_product`,
                                state: {
                                  _id: item._id,
                                  name: item.productName,
                                  price: item.price,
                                  imageLink: item.images[0],
                                  description: item.description,
                                  type: item.transactionType,
                                  categoryid: item.categoryId,
                                },
                              });
                            }}
                            variant="primary"
                          >
                            Edit
                          </Button>
                        </div>
                        <div
                          className="col-md-1 "
                          style={{ marginLeft: "-18px" }}
                        >
                          <Button
                            onClick={async () => {
                              const token = localStorage.getItem("token");
                              const request = {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              };
                              await axios.delete(
                                `http://localhost:5000/products/${item._id}`,
                                request
                              );
                              window.location.reload(true);
                            }}
                            variant="danger"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          .reverse()}
      </Fragment>
    );
  }
};

export default withRouter(MyAds);
