import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };


//fetches users product
export const fetchMyProducts = async (userId) => {
  const response = await axios.get(
    `http://localhost:8080/users/${userId}/get_products`,
    header
  );
  return response;
};

//Send request for a product
export const sendRequest = async (prodId, sender, reciever, price,exchangeId) => {
  const info = {
        senderName: sender,
        recieverName: reciever,
        productId: prodId,
        offer: {
            cash: price,
            productId: exchangeId
        }
    };
  const response = await axios.post(
    `http://localhost:8080/requests/create_new`,info,header
  );
  return response;
}

// //fetch a product's detail
export const fetchProductRequests = async (_id) => {
  const response = await axios.get(
    `http://localhost:8080/requests/${_id}`,
    header
  );
  return response;
};

//Perform an action on the request
export const performAction = async (requestId, action) => {
  const response = await axios.post(
    `http://localhost:8080/requests/${requestId}`,{action},header
  );
  return response;
}

// //fetch requests sent by a user to different products
export const fetchSentRequests = async () => {
  const response = await axios.get(
    `http://localhost:8080/requests/pending`,
    header
  );
  return response;
};

// API call to remove the request from db
export const removeRequest = async (requestId) => {
  const response = await axios.get(
    `http://localhost:8080/requests/remove/${requestId}`,
    header
  );
  return response;
};
