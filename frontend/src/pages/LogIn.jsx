import { useState } from "react";
import axios from 'axios';
import React from "react";


const LogIn = () => {

    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };

        try{
            const tokenKey = "token";
            const response = await axios.post('http://localhost:5000/users/login',data);
            if(response.status === 200 && response.data)
            {
                //Saving the username & token in localstorage
                localStorage.setItem("user_id",response.data.data._id);
                localStorage.setItem("username",response.data.data.username);
                localStorage.setItem(tokenKey,response.data.data.token);
                window.location="/Home";
            }
        }
        catch(ex){
            if (ex.response && ex.response.status === 401){
                alert('Invalid user or password');
            }
        }

    }

    return ( 
    <div className="container mt-20">
        <h1>Log In Page</h1>

        <form className="col-xs-12 col-md-5" onSubmit={submitForm}>
        <div className="form-group">
            <label  htmlFor="username">Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" name="username" />
        </div>
        <div className="form-group">
            <label  htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-primary submitbutton" >Login</button>
        </form>


    </div>
    );
}
 
export default LogIn;