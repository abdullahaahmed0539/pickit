import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrder } from "../API calls/orders";
import Spinner from "../Components/Spinner";

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getOrder(orderId)
      .then(response => {
        setOrder(response.data.data.order);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, [orderId]);

  return (
    <div className="container">
      {!loaded && <Spinner text="Loading" />}
      {loaded && (
        <div className="row mt-5 mb-4 card">
          <div className="card-header">Order details</div>
          <div className="card-body">
            <h3 className="card-title">Order ID : {order._id}</h3>
            <p className="card-text">
              Status:{" "}
              <strong
                className={
                  order.status === "complete" ? "text-success" : "text-danger"
                }
              >
                {order.status}
              </strong>
            </p>
            <p className="card-text">
              Date:
              <strong>
                {` ${new Date(order.date).getDate() + 1}/${
                  new Date(order.date).getMonth() + 1
                }/${new Date(order.date).getFullYear()}`}
              </strong>
            </p>
            <h4>Total: PKR {order.total}</h4>
            <hr />
            <h4 className="card-title">Items bought</h4>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item#</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price(PKR)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {order.order.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{item.productName}</td>
                    <td>{item.username}</td>
                    <td>{item.price}</td>
                    <td>
                      <a href={`/products/${item._id}`}>View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="card-title mt-4">Buyer's details</h4>
            <p className="card-text">
              Username:
              <strong>{` ${order.username}`}</strong>
            </p>
            <p className="card-text">
              E-mail:
              <strong>{` ${order.email}`}</strong>
            </p>
          </div>
          <p className="card-text">
            Phone number:
            <strong>{` 0${order.phone}`}</strong>
          </p>
          <p className="mb-2 card-text">
            Address:
            <strong>{` ${order.address}`}</strong>
                  </p>
                  <hr/>
        </div>
      )}
    </div>
  );
};

export default Order;
