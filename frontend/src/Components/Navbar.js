import React from "react";
import { Link } from "react-router-dom";
import LoginNav from "./UI/LoginNav";
import ModeratorNav from "./UI/ModeratorNav";
import NormalNav from "./UI/NormalNav";

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
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>PickIt</strong>
        </Link>
        {localStorage.getItem("userType") === "normal" && <NormalNav userId={userId} userAccess={userAccess}/>}
        {localStorage.getItem("userType") === "moderator" && <ModeratorNav userAccess={userAccess} />}
        {localStorage.getItem("userType") === null && <LoginNav userAccess={userAccess}/>}
      </div>
    </nav>
  );
};

export default NavBar;
