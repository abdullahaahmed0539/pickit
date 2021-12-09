import axios from "axios";
import dotenv from "dotenv";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };


//create orders
export const createOrder = async data => {
  const response = await axios.post(
    `http://192.168.100.4:5000/orders/create_order`,
    data,
    header
  );
  return response;
};
