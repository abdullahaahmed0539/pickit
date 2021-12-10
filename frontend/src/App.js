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
import SignUp from "./pages/Signup";
import ModeratorHome from "./pages/ModeratorHome";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import NavBar from "./Components/Navbar";
import SentRequests from './pages/SentRequests'
import RecievedRequests from './pages/RecievedRequests';
import Delivery from "./pages/Delivery";
import Cart from './pages/Cart'
import  FulfillOrder from "./pages/FulfillOrder";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        {localStorage.getItem("userType") === "moderator" && (
          <Route path="/Home">
            <ModeratorHome />
          </Route>
        )}
        {localStorage.getItem("userType") === "delivery" && (
          <Route path="/Home">
            <Delivery />
          </Route>
        )}
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/order/fulfill/:orderId">
          <FulfillOrder />
        </Route>
        <Route path="/:userId/get_products">
          <MyAds />
        </Route>
        <Route path="/categories/:categoryId">
          <Category />
        </Route>

        <Route path="/products/:productId/updatePrice">
          <UpdatePrice />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/requests/sent/:userId">
          <SentRequests />
        </Route>
        <Route path="/requests/:productId">
          <RecievedRequests />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
        <Route path="/orders/:orderId">
          <Order />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/products/create_new">
          <CreateProduct />
        </Route>
        <Route path="/products/update_product">
          <UpdateProduct />
        </Route>
        <Route path="/products/:productId">
          <Product />
        </Route>
        <Redirect push to="/Home" />
      </Switch>
    </div>
  );
}

export default App;
