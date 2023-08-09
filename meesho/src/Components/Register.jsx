import React, { useState } from "react";
import '../Components/CSS Files/Login.css'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {


  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Buyer",
  });

  const router = useNavigate();

  console.log(userData, "userData");
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userData.name && userData.email && userData.password) {
      const usersArray = JSON.parse(localStorage.getItem("Users")) || [];
      const userDataObj = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        cart: [],
      };
      usersArray.push(userDataObj);
      localStorage.setItem("Users", JSON.stringify(usersArray));
      setUserData({ name: "", email: "", password: "", role: "Buyer" });
      router("/login");
      toast.success("Registration Successfull.");
    } else {
      toast.error("Please fill the all fields.");
    }
  };

  function selectRole(event) {
    console.log(event.target.value, "- role");
    setUserData({ ...userData, ["role"]: event.target.value });
  }
  return (
    <div id="logscreen">
      <div id="logbody">
        <div>
          <img src="https://images.meesho.com/images/marketing/1661417516766.webp" />
        </div>
        <div>
          <p>Register to create profile</p>
        </div>
        <div id="logform">
          <form
          onSubmit={handleSubmit}
          >
            <label>Select Role :</label>
                   <select onChange={selectRole}>
                   <option value="Buyer">Buyer</option>
                   <option value="Seller">Seller</option>
                   </select>
                   <br />
            <label>Enter your Name :</label>
            <br />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
            <br />
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
            <button>REGISTER</button>
          </form>
        </div>
        <div>
      <span>Already have an account?</span>
        <span onClick={()=>router('/login')}>Login</span>
      </div>
      
      <div>
        <p>By continuing, you agree to Meesho's</p>
        <span>Terms and Conditions</span>
        <span>and </span>
        <span>Privacy Policy</span>
      </div>
    </div>
        
      </div>
  )
}

export default Register