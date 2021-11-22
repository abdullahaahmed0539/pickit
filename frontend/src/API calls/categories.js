import axios from "axios";

const token = localStorage.getItem("token");  

//fetches all categories
export const fetchCategories = async () => {
  const headers = {Authorization: `Bearer ${token}`}  
  const response = await axios.get(
    "http://localhost:5000/categories/", 
    headers);
  return response;
};

//fetches products of a single category against a category id
export const fetchProducts = async (categoryId) => {
  const headers = {Authorization: `Bearer ${token}`}  
  const response = await axios.get(
    `http://localhost:5000/categories/${categoryId}`,
    headers
  );
  return response;
};