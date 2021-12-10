import { Fragment, useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { fetchSentRequests } from "../API calls/requests";
import { Button, Table } from "react-bootstrap";
import { removeRequest } from "../API calls/requests";

const SentRequests = ({ history }) => {
  const { userId } = useParams();
  const [requests, setRequests] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSentRequests()
      .then(response => {
        setRequests(response.data.data.pendingRequests);
        setProducts(response.data.data.products);
      })
      .catch(() => console.log("Error while fetching products"));
  }, [userId]);

  const remove = requestId => {
    let prevRequests = [...requests];
    setRequests(requests.filter(item => item._id !== requestId));

    removeRequest(requestId)
      .then(response => {
        if (response.status !== 200) {
          alert("Unable to remove request from database.");
          setRequests(prevRequests);
        }
      })
      .catch(err => {
        console.log(err);
        alert("Unable to remove request from database - 2");
        setRequests(prevRequests);
      });
  };

  return (
    <Fragment>
      <div className="container mt-5 ml-1">
        <div>
          {requests && requests.length !== 0 ? (
            <h1 style={{ color: "gray" }}>Sent Requests</h1>
          ) : (
            <h1>No Requests Sent Yet</h1>
          )}
        </div>

        {requests &&
          requests.length !== 0 &&
          products &&
          products.length !== 0 && (
            <div style={{ marginTop: "50px" }}>
              <Table
                className="sentrequeststable"
                striped
                bordered
                hover
                size="sm"
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th>Product Title</th>
                    <th>Request Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td
                        style={{
                          textAlign: "center",
                          display: "table-cell",
                          verticalAlign: "middle",
                        }}
                      >
                        {
                          products.find(item => item._id === request.productId)
                            .productName
                        }
                      </td>
                      <td
                        style={
                          request.status === "rejected"
                            ? {
                                color: "red",
                                textAlign: "center",
                                display: "table-cell",
                                verticalAlign: "middle",
                              }
                            : {
                                color: "blue",
                                textAlign: "center",
                                display: "table-cell",
                                verticalAlign: "middle",
                              }
                        }
                      >
                        {request.status}
                      </td>
                      {request.status === "pending" ? (
                        <td
                          style={{
                            display: "table-cell",
                            verticalAlign: "middle",
                            textAlign: "center",
                          }}
                        >
                          <Button
                            onClick={() =>
                              history.push(`/products/${request.productId}`)
                            }
                            className="requestcardbutton"
                          >
                            View Product
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => remove(request._id)}
                            className="requestcardbutton"
                          >
                            Delete
                          </Button>{" "}
                        </td>
                      ) : (
                        <td>
                          <b></b>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
      </div>
    </Fragment>
  );
};

export default withRouter(SentRequests);
