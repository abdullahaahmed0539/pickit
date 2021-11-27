import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { fetchCategories } from "../API calls/categories";
import Spinner from '../Components/Spinner'
import HomeCard from "../Components/HomeCard";
import Error from './Error'

const Home = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(response => {
        setCategories(response.data.data.categories)
      })
      .catch(err => err.response.status === 500 ? setError(true): setError(false))
  }, []);

  if (categories.length === 0 && !error) {
    return <Spinner text='Loading'/>;
  } else if (error) {
    return (
      <Error title='Internal Server Error' message="We are sorry for Inconvenience. You can try reloading the page." />
    );
  }
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
