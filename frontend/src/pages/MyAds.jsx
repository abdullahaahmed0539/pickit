import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { fetchMyProducts, deleteProduct } from "../API calls/products";
import { Button } from "react-bootstrap";
import Card from "../Components/Card";
import { RemoveModal } from "../Components/Modal";
import DropdownSelector from "../Components/UI/Dropdown";
import Spinner from "../Components/Spinner";
import Error from "./Error";

const MyAds = props => {
  const { userId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [productIdToBeDeleted, setProductIdToBeDeleted] = useState("");
  const [productNameToBeDeleted, setProductNameToBeDeleted] = useState("");
  const [listedProducts, setListedProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [responseRecieved, setResponseRecieved] = useState(false);
  const [error, setError] = useState(false);
  const [errType, setErrType] = useState();
  const [noProducts, setNoProducts] = useState(false);

  useEffect(() => {
    fetchMyProducts(userId)
      .then(response => {
        setResponseRecieved(true);
        setListedProducts(response.data.data.Products);
      })
      .catch(err => {
        setResponseRecieved(true);
        if (err.response.status === 404) {
          setNoProducts(true);
        } else if (err.response.status === 500 || err.response.status === 401) {
          setError(true);
          setErrType(err.response.status);
        }
      });
  }, [userId]);

  const displayModal = (id, name) => {
    setModalOpen(true);
    setProductIdToBeDeleted(id);
    setProductNameToBeDeleted(name);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProductIdToBeDeleted("");
    setProductNameToBeDeleted("");
  };

  const removeProduct = async () => {
    deleteProduct(productIdToBeDeleted)
      .then(() => {
        setProductIdToBeDeleted("");
        window.location.reload(true);
      })
      .catch(() => console.log("Error while deleting product"));
  };

  const allFilter = listedProducts
    .map(item => (
      <Card
        key={item._id}
        _id={item._id}
        image={item.images[0]}
        name={item.productName}
        date={item.date}
        status={item.status}
        requestsLength={item.requests.length}
        description={item.description}
        type={item.transactionType}
        categoryId={item.categoryId}
        price={item.price}
        transactionType={item.transactionType}
        onRemove={displayModal}
      />
    ))
    .reverse();

  const activeFilter = listedProducts
    .filter(item => item.status === "active")
    .map(item => (
      <Card
        key={item._id}
        _id={item._id}
        image={item.images[0]}
        name={item.productName}
        date={item.date}
        status={item.status}
        requestsLength={item.requests.length}
        description={item.description}
        type={item.transactionType}
        categoryId={item.categoryId}
        price={item.price}
        transactionType={item.transactionType}
        onRemove={displayModal}
      />
    ))
    .reverse();

  const pendingFilter = listedProducts
    .filter(item => item.status === "pending")
    .map(item => (
      <Card
        key={item._id}
        _id={item._id}
        image={item.images[0]}
        name={item.productName}
        date={item.date}
        status={item.status}
        requestsLength={item.requests.length}
        description={item.description}
        type={item.transactionType}
        categoryId={item.categoryId}
        price={item.price}
        transactionType={item.transactionType}
        onRemove={displayModal}
      />
    ))
    .reverse();

  const rejectedFilter = listedProducts
    .filter(item => item.status === "rejected")
    .map(item => (
      <Card
        key={item._id}
        _id={item._id}
        image={item.images[0]}
        name={item.productName}
        date={item.date}
        status={item.status}
        requestsLength={item.requests.length}
        description={item.description}
        type={item.transactionType}
        categoryId={item.categoryId}
        price={item.price}
        transactionType={item.transactionType}
        onRemove={displayModal}
      />
    ));

  const soldFilter = listedProducts
    .filter(item => item.status === "sold")
    .map(item => (
      <Card
        key={item._id}
        _id={item._id}
        image={item.images[0]}
        name={item.productName}
        date={item.date}
        status={item.status}
        requestsLength={item.requests.length}
        description={item.description}
        type={item.transactionType}
        categoryId={item.categoryId}
        price={item.price}
        transactionType={item.transactionType}
        onRemove={displayModal}
      />
    ))
    .reverse();

  return (
    <div className="container">
      {!responseRecieved && !error && <Spinner text="Loading your products" />}
      {responseRecieved && noProducts && !error && (
        <>
          <div className="row mt-5">
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <h2>
                <strong>You do not have any products.</strong>
              </h2>
            </div>
          </div>
          <div className="row ">
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => props.history.push(`/products/create_new`)}
                variant="primary"
                className="btn btn-lg"
              >
                Add product
              </Button>
            </div>
          </div>
        </>
      )}
      {responseRecieved && !noProducts && !error && (
        <Fragment>
          {modalOpen && (
            <RemoveModal
              close={closeModal}
              remove={removeProduct}
              productName={productNameToBeDeleted}
            />
          )}

          <div className="row">
            <div className="col-7 col-md-3 col-lg-3 mt-4 mb-5">
              <Button
                onClick={() => props.history.push(`/products/create_new`)}
                variant="primary"
                className="btn btn-lg"
              >
                Add product
              </Button>
            </div>
          </div>
          <div className="row mb-3">
            <h2 className="col-7 col-md-4">
              Your products ({listedProducts.length})
            </h2>

            <DropdownSelector
              className="col-md-1 col-3 offset-2 offset-md-6"
              variant="light"
              label=""
              labelRequired={false}
              chosen={filter}
              options={["all", "active", "rejected", "pending", "sold"]}
              onSelect={filter => setFilter(filter)}
              dropdownOff="filter"
            />
          </div>
          {filter === "all" && allFilter}
          {filter === "active" && activeFilter}
          {filter === "rejected" && rejectedFilter}
          {filter === "pending" && pendingFilter}
          {filter === "sold" && soldFilter}
        </Fragment>
      )}
      {responseRecieved && error && (
        <Error
          title={
            errType === 401 ? "Unauthorized Access" : "Internal Server Error"
          }
          message={
            errType === 401
              ? "You are not allowed to access the products."
              : "We are sorry for Inconvenience. You can try reloading the page."
          }
        />
      )}
    </div>
  );
};

export default withRouter(MyAds);
