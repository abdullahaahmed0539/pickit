import { useEffect, useState } from "react";
import ProductForm from "../Components/ProductForm"
import { useLocation } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {

    const location = useLocation();
    const [categoryName, setCategoryName] = useState('')
    useEffect(()=>{
    const fetchCategory = async (id) => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/categories/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryName( (response.data.data.categories.filter(
          (category) => category._id === id
        ))[0].categoryName)
      }; 
      fetchCategory(location.state.categoryid) 
    },[location.state.categoryid])  


    return <>
    {categoryName && <ProductForm
        _id = {location.state._id}
        productName= {location.state.name}
        price= {location.state.price}
        imageLink={location.state.imageLink}
        description={location.state.description}
        type={location.state.type}
        categoryName={categoryName}
        categoryId={location.state.categoryid}
        action = 'Update' />}
        
</>
}

export default UpdateProduct