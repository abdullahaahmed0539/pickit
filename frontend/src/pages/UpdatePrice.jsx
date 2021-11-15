import { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { Image } from "react-bootstrap";
import axios from "axios";

const UpdatePrice = ({ history }) => {
  let initialProduct = {
    productName: "",
    _id: "",
    description: "",
    username: "",
    categoryId: "",
    price: "",
    transactionType: "",
    images: [],
    date: "",
    status: "",
    requests: [],
  };

  const [product, setProduct] = useState(initialProduct);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const prod = response.data.data;
      setProduct(prod);
    }

    fetchProduct()
  }, [productId]);


  const submitChanges = async (e) => {
    e.preventDefault();

    const modifiedProduct = {
      _id: productId,
      productName: product.productName,
      categoryId: product.categoryId,
      username: product.username,
      description: product.description,
      images: product.images,
      transactionType: product.transactionType,
      date: product.date,
      price: product.price,
    };

    console.log(modifiedProduct);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://localhost:5000/products/update`,
        modifiedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        console.log("success");

        window.location = "/moderator_home";
    
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        alert("Update request Unsuccessful");
      }
      console.log("in catch");
    }
  };

  return (
    <div>
      <h2>Change Price Here !</h2>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* <img src={require(`../assets/stanSmith.jpeg`).default} className="rounded mx-auto d-block" alt="..." /> */}
        <Image src={product.images[0]} rounded />
      </div>
      <div className="container">
        <form className="col-xs-12 col-md-5" onSubmit={submitChanges}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              placeholder="Enter product title"
              value={product.productName}
              onChange={(e) => {
                let modifiedProduct = { ...product };
                modifiedProduct.productName = e.target.value;
                setProduct(modifiedProduct);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={(e) => {
                let modifiedProduct = { ...product };
                modifiedProduct.description = e.target.value;
                setProduct(modifiedProduct);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (Rs) </label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={(e) => {
                let modifiedProduct = { ...product };
                modifiedProduct.price = e.target.value;
                setProduct(modifiedProduct);
              }}
            />
          </div>
          <button
            style={{ marginTop: "15px" }}
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(UpdatePrice);
