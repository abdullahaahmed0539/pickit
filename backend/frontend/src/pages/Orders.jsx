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
      <div className="row mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order ID</th>
                <th scope="col" className="d-none d-md-block">
                  Date
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr
                  className={
                    item.status === "In progress" ? "" : "table-success"
                  }
                  key={index}
                >
                  <td>{index + 1}.</td>
                  <td>
                    <a href={`/orders/${item._id}`}>{item._id}</a>
                  </td>
                  <td className="d-none d-md-block">{`${
                    new Date(item.date).getDate() + 1
                  }/${new Date(item.date).getMonth() + 1}/${new Date(
                    item.date
                  ).getFullYear()}`}</td>

                  <td
                    className={
                      item.status === "In progress"
                        ? "text-danger"
                        : "text-success"
                    }
                  >
                    {item.status}
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
