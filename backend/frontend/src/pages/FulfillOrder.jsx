import { useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import {fullfilOrder} from '../API calls/orders'

const FulfillOrder = ({history}) => {
  const orderId = useParams().orderId;
  const [PIN, setPIN] = useState("");

    const fullfil = (e) => {
        e.preventDefault()
        const data = {orderId, PIN}
        fullfilOrder(data)
            .then(() => history.push('/'))
            .catch(err => err.response.status === 400 ? alert('Incorrect Pin'): '')
        
  }  
    
  return (
    <div className="container">
      <h4 className="mt-4">Order Id : {orderId}</h4>
      <form onSubmit={fullfil}>
        <div className="mt-4 mb-3">
          <label className="form-label">Verification PIN</label>
          <input
            type="text"
            className="form-control"
            onChange={e => {
              setPIN(e.target.value);
            }}
                  />
                  <button className="mt-3 btn btn-primary">
                      Finish delivery
                  </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(FulfillOrder)
