import { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";

import { updateProduct, fetchProductDetails } from "../API calls/products";
import Spinner from "../Components/Spinner";

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

  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    console.log(productId)
    fetchProductDetails(productId)
      .then(response => {
        setProduct(response.data.data.product)
        console.log(product);
      })
      .catch(err => console.log(err));
    
  }, [productId]);

  const submitChanges = async e => {
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

      updateProduct(modifiedProduct)
        .then(response => {
          if (response.status === 200 && response.data) {
            window.location = `/products/${product._id}`;
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            alert("Update request Unsuccessful");
          }
        });
    
  };

  if (product) {
    return (
      <div className="container">
       
          <div className="row mt-5">
            <img className="col-md-4" src={product.images} alt="..." />
            <div className="col-md-7 offset-md-1">
              <h2>Edit details</h2>
              <form onSubmit={submitChanges}>
                <div className="form-group">
                  <label style={{ marginTop: "20px" }} htmlFor="productName">
                    <strong>Product Name</strong>
                  </label>
                  <textarea
                    className="form-control"
                    id="productName"
                    placeholder="Enter product title"
                    value={product.productName}
                    onChange={e => {
                      let modifiedProduct = { ...product };
                      modifiedProduct.productName = e.target.value;
                      setProduct(modifiedProduct);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ marginTop: "10px" }} htmlFor="description">
                    <strong>Description</strong>
                  </label>
                  <textarea
                    style={{ height: "200px" }}
                    className="form-control"
                    id="description"
                    placeholder="Enter product description"
                    value={product.description}
                    onChange={e => {
                      let modifiedProduct = { ...product };
                      modifiedProduct.description = e.target.value;
                      setProduct(modifiedProduct);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ marginTop: "10px" }} htmlFor="price">
                    <strong>Price (Rs)</strong>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Enter product price"
                    value={product.price}
                    onChange={e => {
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
        )
      </div>
    );

  } else {
    return <Spinner text='loading'/>
  }

  };

export default withRouter(UpdatePrice);
