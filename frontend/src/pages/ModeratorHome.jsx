import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  fetchPendingProducts,
} from "../API calls/products";

const ModeratorHome = ({ history }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchPendingProducts()
      .then((response) => setProducts(response))
      .catch(() => console.log("Error while fetching unapproved products"));
  }, []);


  return (
    <div className="container">
      <div className='row mt-5'>
        <h2>Pending requests ({products.length})</h2>
        <hr></hr>
      </div>
      <div className="row mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{item.productName}</td>
                <td>
                  <a href={`/products/${item._id}`}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(ModeratorHome);
