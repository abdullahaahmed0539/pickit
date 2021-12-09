import { useEffect, useState } from "react";
import { myOrders } from "../API calls/orders";

const Orders = () => {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    myOrders(localStorage.getItem("username"))
      .then(response => setOrder(response.data.data.orders))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order#</th>
              <th scope="col">Order ID</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr
                className={item.status === "In progress" ? "" : "table-success"}
                key={index}
              >
                <td>{index + 1}.</td>
                <td>{item._id}</td>
                <td>{`${new Date(item.date).getDate() + 1}/${
                  new Date(item.date).getMonth() + 1
                }/${new Date(item.date).getFullYear()}`}</td>
               
                <td
                  className={
                    item.status === "In progress"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {item.status}
                </td>
                <td>
                  <a href={`/orders/${item._id}`}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
