import { useEffect, useState } from "react";
import { userDetail, updateUser } from "../API calls/user";
import { fetchCart } from "../API calls/products";
import Spinner from "../Components/Spinner";

const Checkout = () => {
  const [userExists, setUserExists] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const [disabled, setDisabled] = useState(true);
  let total = 0;

  useEffect(() => {
    userDetail(localStorage.getItem("username"))
      .then(response => {
        setUserExists(true);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setAddress(response.data.data.address);
      })
      .catch(err => console.log(err));

    fetchCart(localStorage.getItem("user_id")).then(response =>
      setCart(response.data.data.cartProducts)
    );
  }, []);
  cart.map(item => (total += parseFloat(item.price)));

  return (
    <div className="container">
      {!userExists && <Spinner text="Loading" />}
      {userExists && (
        <>
          <h2 className="row mt-3">Checkout</h2>
          <div className="row card mt-3">
            <div className="card-header">Your details</div>
            <div className="card-body">
              <h5 className="card-title">Make sure your details are right.</h5>
              <br />
              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    placeholder={username}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder={email}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    value={phone}
                    placeholder={phone}
                    onChange={e => setPhone(e.target.value)}
                    disabled={disabled}
                  />
                  {(phone === "" ||
                    phone.length !== 10 ||
                    phone.charAt(0) !== "3") && (
                    <div style={{ color: "red" }}>
                      Please provide a phone number.
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={address}
                    placeholder={address}
                    onChange={e => setAddress(e.target.value)}
                    disabled={disabled}
                  />
                  {address === "" && (
                    <div style={{ color: "red" }}>
                      Please provide an address.
                    </div>
                  )}
                </div>
              </form>
              {disabled && (
                <button
                  className="col-md-1 btn btn-primary"
                  onClick={() => {
                    setDisabled(false);
                  }}
                >
                  Edit
                </button>
              )}
              {!disabled && (
                <>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setDisabled(true);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={phone === "" || address === "" ? true : false}
                    className="btn btn-success ms-1"
                    onClick={() => {
                      setDisabled(true);
                      updateUser({ phone, address }).catch(err =>
                        console.log(err)
                      );
                    }}
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="row card mt-4 mb-5">
            <div className="card-header">Cart details</div>
            <div className="card-body">
              <h5 className="card-title">Cart Items({cart.length})</h5>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Products</th>
                    <th scope="col">Price(PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.productName}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <h4>Total</h4>
                    </td>
                    <td>
                      <h4>{total}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                className="btn btn-primary col-12 col-md-2 mt-3"
                disabled={
                  username === "" ||
                  email === "" ||
                  phone === "" ||
                  address === "" ||
                  cart.length === 0
                    ? true
                    : false
                }
              >
                Place order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
