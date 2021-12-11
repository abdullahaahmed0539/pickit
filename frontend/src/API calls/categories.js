import axios from "axios";

const token = localStorage.getItem("token");  

//fetches all categories
export const fetchCategories = async () => {
  const headers = { Authorization: `Bearer ${token}` }  
  const response = await axios.get(
    `http://${process.env.REACT_APP_SERVER}/categories/`,
    headers
  );
  return response;
};

//fetches products of a single category against a category id
export const fetchProducts = async (categoryId,pageId) => {
  const headers = {Authorization: `Bearer ${token}`}  
  const response = await axios.get(
    `http://${process.env.REACT_APP_SERVER}/categories/${categoryId}/${pageId}`,
    headers
  );
  return response;
};