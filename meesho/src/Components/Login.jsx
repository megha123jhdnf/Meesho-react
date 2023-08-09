import React, { useContext, useState } from "react";
import '../Components/CSS Files/Login.css'
import { AuthContext } from "./Context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { state, Login } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const router= useNavigate();


  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      var flag = false;
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == userData.email &&
          allUsers[i].password == userData.password
        ) {
          localStorage.setItem("Current-user", JSON.stringify(allUsers[i]));
          Login(allUsers[i]);
          setUserData({ email: "", password: "", role: "" });
          toast.success("Login Successfull!");
          router("/");
          flag = true;
          break;
        }
      }
      if (flag == false) {
        toast.error("Please Check your email & password.");
      }
    } else {
      toast.error("Please fill the all fields.");
    }
  };
  return (
    <div id="logscreen">
      <div id="logbody">
        <div>
          <img src="https://images.meesho.com/images/marketing/1661417516766.webp" />
        </div>
        <div>
          <p>Log In to view your profile</p>
        </div>
        <div id="logform">
          <form
          onSubmit={handleSubmit}
          >
            <label>Enter your Email ID :</label>
            <br />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <br />
            <label>Enter your Password :</label>
            <br />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <br />
            <button>LOGIN</button>
          </form>
        </div>
        <div>
      <span>Do not have an Account?</span>
        <span onClick={()=>router('/register')}>Register</span>
      </div>
      
      <div>
        <p>By continuing, you agree to Meesho's</p>
        <span>Terms and Conditions</span>
        <span>and </span>
        <span>Privacy Policy</span>
      </div>
    </div>
        
      </div>
      
  );
};

export default Login;