import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { fetchCategories } from "../API calls/categories";
import Spinner from '../Components/Spinner'
import HomeCard from "../Components/HomeCard";

const Home = ({ history }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(response => setCategories(response.data.data.categories))
      .catch('Error while fetching categories')
  }, []);

  
  if (categories.length === 0) 
    return <Spinner />;
  else {
    return (
      <div className="container mt-4">
        <div className="row mb-4"><h3><strong>What are you looking for?</strong></h3></div>
        <div className="row">
          {categories.map((cat) => (
            <HomeCard
              key={cat._id} 
              _id={cat._id} 
              name={cat.categoryName} 
              image={cat.image} 
              description={cat.description}
              buttonName='Explore'
              onButtonPress={()=> history.push(`/categories/${cat._id}`)}
              history={history}
              />
          ))}
        </div>
      </div>
    );
  }
};

export default withRouter(Home);
