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

  useEffect(() => {
    userDetail(localStorage.getItem("username"))
      .then(response => {
        setUserExists(true);
        setUsername(response.data.data.username);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setAddress(response.data.data.address);
        // setCart(response.data.data.cart);          
        })
      .catch(err => console.log(err));
    
    fetchCart(localStorage.getItem('user_id')).then(response => 
      setCart(response.data.data.cartProducts)
     )
   
        
    }, []);

  return (
    <div className="container">
      {!userExists && <Spinner text="Loading" />}
      {userExists && (
        <>
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
                    type="text"
                    className="form-control"
                    value={phone}
                    placeholder={phone}
                    onChange={e => setPhone(e.target.value)}
                    disabled={disabled}
                  />
                  {phone === "" && (
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
                  className="btn btn-primary"
                  onClick={() => {
                    setDisabled(false);
                  }}
                >
                  Edit
                </button>
              )}
              {!disabled && (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setDisabled(true);
                    updateUser({ phone, address }).catch(err =>
                      console.log(err)
                    );
                    alert("Information edited.");
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div className="row card mt-4">
            <div className="card-header">Cart details</div>
            <div className="card-body">
              <h5 className="card-title">Cart Items</h5>
              {cart.map(item => <p key={item._id}>{item.productName}</p>)}
              <button
                className="btn btn-primary"
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
