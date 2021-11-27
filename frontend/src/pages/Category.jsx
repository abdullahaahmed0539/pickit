import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../API calls/categories";
import { Pagination } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import Error from "./Error";
import Spinner from "../Components/Spinner";

const Products = ({ history }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [pageId, setPageId] = useState(1);
  const limit = 3;
  let itemsPaginate = [];
  const [pages, setPages] = useState(itemsPaginate);
  const [error, setError] = useState(false);
  const [responseRecieved, setResponseRecieved] = useState(false);

  useEffect(() => {
    fetchProducts(categoryId, pageId)
      .then(response => {
        setResponseRecieved(true);
        setProducts(response.data.data.categoryProducts);
        let arrpages = [];
        for (
          let number = 1;
          number <= Math.ceil(response.data.data.totalProducts / limit);
          number++
        ) {
          arrpages.push(number);
        }
        setPages(arrpages);
      })
      .catch(err => {
        setResponseRecieved(true);
        setError(true);
      });
  }, [categoryId, pageId]);

  return (
    <div className="grid container mt-4">
      
      {!error && !responseRecieved && <Spinner text='Fetching products'/>}
      {error && (
        <Error title='Internal Server Error.' message="We are sorry for Inconvenience. You can try reloading the page." />
      )}
      {!error && responseRecieved && products.length === 0 && (
        <div style={{ marginTop: "20%", marginLeft: "37%" }}>
          <h2>
            <strong>No products to show.</strong>
          </h2>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "70px", marginTop: "10px" }}
            onClick={() => (window.location = "/")}
          >
            back to home page
          </button>
        </div>
      )}
      {!error && (
        <div className="row">
          {products.map(product => (
            <ProductCard
              key={product._id}
              image={`${product.images[0]}`}
              name={product.productName}
              price={product.price}
              transactionType={product.transactionType}
              onButtonPress={() => history.push(`/products/${product._id}`)}
            />
          ))}
          {pages && pages.length > 1 && (
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination>
                {pages.map(number => (
                  <Pagination.Item
                    key={number}
                    onClick={() => setPageId(number)}
                    active={number === pageId}
                  >
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default withRouter(Products);
