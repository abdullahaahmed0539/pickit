import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//logs in a user
export const login = async data =>
  await axios.post(`http://${process.env.REACT_APP_SERVER}/users/login`, data);

//register a user
export const register = async data =>
  await axios.post(`http://${process.env.REACT_APP_SERVER}/users/signup`, data);

//get User details
export const userDetail = async username => {
  const response = await axios.get(
    `http://${process.env.REACT_APP_SERVER}/users/get_user_details/${username}`,
    header
  );
  return response;
};

//update user details
export const updateUser = async data => {
  const response = await axios.post(
    `http://${process.env.REACT_APP_SERVER}/users/update_profile`,
    data,
    header
  );
  return response;
};

//update user details
export const clearCart = async () => {
  const response = await axios.post(
    `http://${process.env.REACT_APP_SERVER}/users/clear_cart`,
    {},
    header
  );
  return response;
};
