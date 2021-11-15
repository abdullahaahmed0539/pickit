import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Category from "./pages/Category";
import Product from "./pages/Product";
import MyAds from "./pages/MyAds";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import UpdatePrice from "./pages/UpdatePrice";

import NavBar from "./Components/Navbar";
import ModeratorHome from "./pages/ModeratorHome";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route  path="/login">
          <LogIn />
        </Route>
        <Route  path="/Home">
          <Home />
        </Route>
        <Route  path="/moderator_home">
          <ModeratorHome />
        </Route>
        <Route  path="/:userId/get_products">
          <MyAds />
        </Route>
        <Route  path="/categories/:categoryId">
          <Category />
        </Route>
        <Route  path= '/products/:productId/updatePrice'>
          <UpdatePrice />
        </Route>
        <Route path="/products/create_new">
          <CreateProduct />
        </Route>
        <Route  path="/products/update_product">
          <UpdateProduct />
        </Route>
        <Route  path="/products/:productId">
          <Product />
        </Route>
        <Redirect push to="/Home" />
      </Switch>
    </div>
  );
}

export default App;
