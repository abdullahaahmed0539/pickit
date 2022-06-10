import axios from "axios";

const token = localStorage.getItem("token");
const header = { headers: { Authorization: `Bearer ${token}` } };

//logs in a user
export const login = async data =>
  await axios.post(`https://pickitt.herokuapp.com:8080/users/login`, data);

//register a user
export const register = async data =>
  await axios.post(`https://pickitt.herokuapp.com:8080/users/signup`, data);

//get User details
export const userDetail = async username => {
  const response = await axios.get(
    `https://pickitt.herokuapp.com:8080/users/get_user_details/${username}`,
    header
  );
  return response;
};

//update user details
export const updateUser = async data => {
  const response = await axios.post(
    `https://pickitt.herokuapp.com:8080/users/update_profile`,
    data,
    header
  );
  return response;
};

//update user details
export const clearCart = async () => {
  const response = await axios.post(
    `https://pickitt.herokuapp.com:8080/users/clear_cart`,
    {},
    header
  );
  return response;
};
