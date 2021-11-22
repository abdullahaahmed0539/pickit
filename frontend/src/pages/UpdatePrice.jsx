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
    };

    fetchProduct();
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
      console.log(ex);
    }
  };

  return (
    <div className="container">
      <div className='row mt-5'>
        {/* <div className='col-md-7'> */}
          <img className='col-md-4' src={product.images[0]} alt='...' />
        {/* </div> */}
      <div className="col-md-5" style={{marginLeft:'5em'}}>
      <h2>Change Price Here !</h2>
        <form className="col-xs-12 col-md-5" onSubmit={submitChanges}>
          <div className="form-group">
            <label style={{marginTop: "20px"}} htmlFor="productName"><strong>Product Name</strong></label>
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
            <label style={{marginTop: "10px"}} htmlFor="description"><strong>Description</strong></label>
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
            <label style={{marginTop: "10px"}} htmlFor="price"><strong>Price (Rs)</strong> </label>
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
    </div>
  );
};

export default withRouter(UpdatePrice);
