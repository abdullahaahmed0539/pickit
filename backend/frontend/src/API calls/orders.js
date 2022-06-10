import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//create orders
export const createOrder = async data => {
  const response = await axios.post(
    `https://pickitt.herokuapp.com/api/orders/create_order`,
    data,
    header
  );
  return response;
};

//list orders
export const myOrders = async username => {
  const response = await axios.get(
    `https://pickitt.herokuapp.com/api/orders/my_orders/${username}`,
    header
  );
  return response;
};

//get order
export const getOrder = async orderId => {
  const response = await axios.get(
    `https://pickitt.herokuapp.com/api/orders/${orderId}`,
    header
  );
  return response;
};

//list all orders
export const getAllOrders = async () => {
  const response = await axios.get(
    `https://pickitt.herokuapp./api/orders/get_all_orders`,
    header
  );
  return response;
};


//list all orders
export const fullfilOrder = async (data) => {
  const response = await axios.post(
    `https://pickitt.herokuapp./api/orders/fullfil`,
    data,
    header
  );
  return response;
};
