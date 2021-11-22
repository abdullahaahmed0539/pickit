import { useEffect, useState } from "react";
import ProductForm from "../Components/ProductForm"
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchCategories } from "../API calls/categories";

const UpdateProduct = () => {

    const location = useLocation();
    const [categoryName, setCategoryName] = useState('')
    useEffect(()=>{
      fetchCategories(location.state.categoryid)
        .then(response => setCategoryName(response.data.data.categories.filter(
                category => category._id === location.state.categoryid
                )[0].categoryName))
        .catch()
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