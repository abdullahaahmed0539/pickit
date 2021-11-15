import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Home = ({ history }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/categories/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cat = response.data.data.categories;
      setCategories(cat);
    };
    fetchCategories();
  }, []);

  return (
    <div className="grid container mt-4">
     <div className="row">
       
      {categories.map(
        (cat) => (
          <div className='col-md-3 mb-4' key={cat._id}>
          <div className="card">
            <img src={`${cat.image}`} className="card-img-top mt-3" style={{height:"10em"}} alt="..." />
            <div className="card-body">
              <h5 className="card-title"><strong>{cat.categoryName.charAt(0).toUpperCase() + cat.categoryName.slice(1)}</strong></h5>
              <p className="card-text">{cat.description}</p>
              <Button className="btn  btn-primary" onClick={() => history.push(`/categories/${cat._id}`)}>Explore</Button>
            </div>
          </div>
          </div>
        )
      )}
     </div>
     
    </div>
  );
};

export default withRouter(Home);
