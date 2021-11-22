import axios from "axios";

//logs in a user
export const login = async data => await axios.post("http://localhost:5000/users/login", data);

//register a user
export const register = async data => await axios.post("http://localhost:5000/users/signup",data);


