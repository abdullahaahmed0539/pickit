import { useParams, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../API calls/categories";
import  ProductCard  from "../Components/ProductCard";

const Products = ({ history }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(categoryId)
      .then(response => setProducts(response.data.data.categoryProducts))
      .catch("Error while fetching products");
  }, [categoryId]);

  return (
    <div className="grid container mt-4">
      <div className="row">
        {products.map(product => 
          <ProductCard
            key={product._id}
            image={`${product.images[0]}`}
            name={product.productName}
            price={product.price}
            transactionType={product.transactionType}
            onButtonPress={() => history.push(`/products/${product._id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(Products);
