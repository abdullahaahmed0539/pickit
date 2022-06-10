import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Spinner from "./Components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const LogIn = lazy(() => import("./pages/LogIn"));
const Category = lazy(() => import("./pages/Category"));
const Product = lazy(() => import("./pages/Product"));
const MyAds = lazy(() => import("./pages/MyAds"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const UpdatePrice = lazy(() => import("./pages/UpdatePrice"));
const SignUp = lazy(() => import("./pages/Signup"));
const ModeratorHome = lazy(() => import("./pages/ModeratorHome"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));
const Order = lazy(() => import("./pages/Order"));
const NavBar = lazy(() => import("./Components/Navbar"));
const SentRequests = lazy(() => import("./pages/SentRequests"));
const RecievedRequests = lazy(() => import("./pages/RecievedRequests"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Cart = lazy(() => import("./pages/Cart"));
const FulfillOrder = lazy(() => import("./pages/FulfillOrder"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner text="Loading" />}>
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
          {localStorage.getItem("token") !== null ? (
            <Redirect push to="/Home" />
          ) : (
            <Redirect push to="/login" />
          )}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
