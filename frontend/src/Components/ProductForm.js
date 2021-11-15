import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { withRouter } from "react-router";

const ProductForm = (props) => {
  const [type, setType] = useState(props.type);
  const [categories, setCategories] = useState([]);
  const [chosenCategoryId, setChosenCategoryId] = useState(props.categoryId);
  const [chosenCategoryName, setChosenCategoryName] = useState(
    props.categoryName
  );
  const [productName, setProductName] = useState(props.productName);
  const [price, setPrice] = useState(props.price);
  const [imgLink, setImgLink] = useState(props.imageLink);
  const [productDescription, setProductDescription] = useState(
    props.description
  );

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let data = {
      productName,
      categoryId: chosenCategoryId,
      username: localStorage.getItem("username"),
      description: productDescription,
      price,
      date: Date.now(),
      transactionType: type,
      images: imgLink,
    };
    let route = "";
    if (props.action === "Update") {
      data = { ...data, _id: props._id };
      route = "http://localhost:5000/products/update";
    } else {
      route = "http://localhost:5000/products/create_new";
    }

    const response = await axios.post(route, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
      const userId = localStorage.getItem("user_id");
      props.history.push(`/${userId}/get_products`);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/categories/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(response.data.data.categories);
    };
    fetchCategories();
  }, []);

  return (
    <React.Fragment>
      <Form
        onSubmit={submit}
        className=" container "
        style={{ background: "" }}
      >
        <Form.Group className="row mb-3 mt-3">
          <div className="col-md-5 offset-md-4">
            <Form.Label>
              <h6>Product Name</h6>
            </Form.Label>
            <Form.Control
              type="Text"
              placeholder="Enter Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className=" row mb-3 mt-4">
          <div className="col-md-5 offset-md-4">
            <Form.Label>
              <h6>Price</h6>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price in PKR"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3 mt-4">
          <div className="col-md-5 offset-md-4">
            <Form.Label>
              <h6>Image Link</h6>
            </Form.Label>
            <Form.Control
              type="Text"
              placeholder="image link"
              value={imgLink}
              onChange={(e) => setImgLink([e.target.value])}
            />
          </div>
        </Form.Group>

        <Form.Group className="row mb-3 mt-4">
          <div className="col-md-5 offset-md-4">
            <Form.Label>
              <h6>Description</h6>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Add product description here."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
        </Form.Group>

        <div className="row mt-2">
          <Form.Group className=" col-md-2 mb-3 offset-md-4">
            <Form.Label>
              <h6>Transaction type</h6>
            </Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="btn-outline-dark">
                {type}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setType("sell")}>
                  sell
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setType("exchange")}>
                  exchange
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group className=" col-md-2 mb-3">
            <Form.Label>
              <h6>Category</h6>
            </Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" className="btn-outline-dark">
                {chosenCategoryName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category._id}
                    onClick={() => {
                      setChosenCategoryId(category._id);
                      setChosenCategoryName(category.categoryName);
                    }}
                  >
                    {category.categoryName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </div>

        <div className="row mt-4">
          <div className="col-md-2 offset-md-4">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              disabled={
                productName === "" ||
                price === "" ||
                imgLink === [] ||
                productDescription === ""
                  ? true
                  : false
              }
            >
              {props.action || "Create"}
            </Button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default withRouter(ProductForm);
