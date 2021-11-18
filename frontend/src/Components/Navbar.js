import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ history }) => {
  const userId = localStorage.getItem("user_id");

  const userAccess = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("userType");
      localStorage.removeItem("categoryId");
    }
    window.location = "/login";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>PickIt</strong>
        </Link>
        {localStorage.getItem("userType") !== "moderator" &&
          localStorage.getItem("userType") != null && (
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/Home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to={`/${userId}/get_products`}
                    >
                      MyAds
                    </NavLink>
                  </li>
                  {/* <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Notifications
              </Link>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              ></ul>
            </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Profile
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}
           <button
            className="btn btn-dark btn-outline-light "
            style={{ marginLeft: "900px" }}
            onClick={userAccess}
          >
            {localStorage.getItem("username") ? "Log out" : "Log in"}
          </button>
      </div>
    </nav>
  );
};

export default NavBar;
