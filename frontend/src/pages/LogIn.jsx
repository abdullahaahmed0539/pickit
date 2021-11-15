import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      const tokenKey = "token";
      const response = await axios.post(
        "http://localhost:5000/users/login",
        data
      );
      if (response.status === 200 && response.data) {
        //Saving the username & token in localstorage
        localStorage.setItem("user_id", response.data.data._id);
        localStorage.setItem("username", response.data.data.username);
        localStorage.setItem(tokenKey, response.data.data.token);
        localStorage.setItem('userType', response.data.data.userType);
        if (response.data.data.userType === 'moderator'){
          window.location = "/moderator_home";
        }else{
          window.location = "/Home";
        }
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        alert("Invalid user or password");
      }
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-md-7" style={{ background: "#92CDE6" }}>
          <img
            src="https://businessmodelnavigator.com/img/navigator-pattern-img-2/5.png"
            className="img-fluid rounded-start "
            alt="..."
            style={{ height: "93vh" }}
          />
        </div>
        <div className="col-md-5 mt-5">
          <div className="container">
            <h1>Welcome to PickIt.</h1>
            <p>
              A place where you can buy or exchange whatever you want. Who said
              barter system was past?
              <strong> Login now to find the best products online!</strong>
            </p>

            <div className="card">
              <div className="card-body container">
                <form onSubmit={submitForm}>
                  <div className="row">
                    <div className="form-group ">
                      <label className="form-label">
                        <strong>Username</strong>
                      </label>
                      <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter your username here"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>Password</strong>
                      </label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Enter your password here"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary submitbutton  "
                        disabled={
                          username === "" || password === "" ? true : false
                        }
                      >
                        Login
                      </button>
                    </div>

                    <p className='mt-5'>Don't have an account. <Link to='/home'>Create an account.</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
