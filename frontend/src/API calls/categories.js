import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()
const token = localStorage.getItem("token");  

//fetches all categories
export const fetchCategories = async () => {
  const headers = {Authorization: `Bearer ${token}`}  
  const response = await axios.get(
    `http://192.168.100.6:5000/categories/`,
    headers
  );
  return response;
};

//fetches products of a single category against a category id
export const fetchProducts = async (categoryId,pageId) => {
  const headers = {Authorization: `Bearer ${token}`}  
  const response = await axios.get(
    `http://192.168.100.6:5000/categories/${categoryId}/${pageId}`,
    headers
  );
  return response;
};