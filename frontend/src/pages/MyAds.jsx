import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import Card from "../Components/Card";
import {RemoveModal} from "../Components/Modal";



const MyAds = (props) => {
  const { userId } = useParams();
  const [modalOpen, setModalOpen] = useState(false)
  const [productToBeDeleted, setProductToBeDeleted] = useState('')
  const [listedProducts, setListedProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  
  const displayModal = id => {
    setModalOpen(true)
    setProductToBeDeleted(id)
  } 

  const closeModal = () => {
    setModalOpen(false)
    setProductToBeDeleted('')
  } 

  const removeProduct = async() => {
        const token = localStorage.getItem("token");
        const request = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(
          `http://localhost:5000/products/${productToBeDeleted}`,
          request
        );
        setProductToBeDeleted('')
        window.location.reload(true);
      
  }

  const allFilter = listedProducts
    .map((item) => (
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
        onRemove = {displayModal}
      />
    ))
    .reverse();

  const activeFilter = listedProducts
    .filter((item) => item.status === "active")
    .map((item) => (
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
        onRemove = {displayModal}
      />
    ));

  const pendingFilter = listedProducts
    .filter((item) => item.status === "pending")
    .map((item) => (
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
        onRemove = {displayModal}
      />
    ));

  const rejectedFilter = listedProducts
    .filter((item) => item.status === "rejected")
    .map((item) => (
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
        onRemove = {displayModal}
      />
    ));

  const soldFilter = listedProducts
    .filter((item) => item.status === "sold")
    .map((item) => (
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
        onRemove = {displayModal}
      />
    ));

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

if (listedProducts.length === 0){
    return (
      <>
        <div className="row mt-5">
          <h2 className="col-md-6 offset-md-4">You have no products listed.</h2>
        </div>
        <div className="row">
          <div className="col-md-5 offset-5 mt-3 mb-4 ">
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
    );
  }else {
    return (
      <Fragment>
        {modalOpen && <RemoveModal close={closeModal} remove={removeProduct}/>}
        <div className="container">
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
          <div className="row">
            <h2 className="col-md-5">All products you have listed</h2>

            <Dropdown className="col-md-3 offset-md-4">
              <Dropdown.Toggle variant="light" className="btn-outline-dark">
                Filter by {filter}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("all");
                  }}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("active");
                  }}
                >
                  Active
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("pending");
                  }}
                >
                  Pending
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("rejected");
                  }}
                >
                  Rejected
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("sold");
                  }}
                >
                  Sold
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {filter === "all" && allFilter}
          {filter === "active" && activeFilter}
          {filter === "rejected" && rejectedFilter}
          {filter === "pending" && pendingFilter}
          {filter === "sold" && soldFilter}
        </div>
      </Fragment>
    );
  }
};

export default withRouter(MyAds);
