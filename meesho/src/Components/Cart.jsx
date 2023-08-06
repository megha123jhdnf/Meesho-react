import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../Components/CSS Files/Cart.css'
import { AuthContext } from "./Context/AuthContext"

const Cart = () => {
    const { state } = useContext(AuthContext);
  const [finalprice, setFinalPrice] = useState(0);
  const [userCart, setUserCart] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const router = useNavigate();

  // console.log(userCart, "- userCart");

  useEffect(() => {
    if (state) {
      setUserData(state.user);
    }
  }, [state]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Current-user"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == user.email &&
          allUsers[i].password == user.password
        ) {
          setUserCart(allUsers[i].cart);
          break;
        }
      }
    } else {
     toast.error("Please login to watch all cart products.");
      router("/login");
    }
  }, []);

  useEffect(() => {
    if (userCart.length) {
        var totalprice = 0;
        for (var i = 0; i < userCart.length; i++) {
            totalprice += parseInt(userCart[i].price);
        }
        setFinalPrice(totalprice)
    }
}, [userCart])


useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Current-user"))
    if (user) {
        if (user?.role == "Seller") {
            toast.error("Access granted only to Buyer.")
            router('/')
        }
    } else {
        toast.error("You are not a Logged in user.")
        router('/login')
    }
}, [])


  function checkout(){
    const user = JSON.parse(localStorage.getItem("Current-user"));
    if (user?.email) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == user.email &&
          allUsers[i].password == user.password
        ) {
          allUsers[i].cart=[];
          break;
        }
      }
      localStorage.setItem("Users",JSON.stringify(allUsers))
    }
    setFinalPrice([]);  
    setUserCart([]);
   toast.success("Your products will be delivered soon. Thankyou for shopping!")
  }
  
  return (
    <div id='cascreen'>
        <div id="cabody">
        <div id="caleft">
          <div>
            <span>Cart</span>
            <span></span>
          </div>
          
          <div>
          {userCart &&
          userCart.map((pro) => (
          <div>
            <div>
              <div>
               <img src={pro.image}/>
              </div>
              <div>
                <p style={{fontWeight: "600"}}>{pro.name}</p>
                <p>Size: L   Qty: 1</p>
                <p>₹{pro.price}</p>
                <p style={{fontWeight: "600", marginTop: "10px"}}>X REMOVE</p>
              </div>
              <div>
                <p>EDIT</p>
              </div>
            </div>
            <div>
               <p>Sold By: D.I</p>
               <p>Free Delivery</p>
            </div>
          </div>
          ))}
          </div>


        </div>
        <div id="caright">
            <div>
                <p>Price Details</p>
                <span>Total Product Price</span>
                <span>₹{finalprice + finalprice}</span>
            </div>
            <div>
                <span>Order Total</span>
                <span>₹{finalprice}</span>
                <p>Clicking on Continue will not deduct any money</p>
            </div>
            <div>
                <button onClick={checkout}>Continue</button>
            </div>
            <div>
                <img src="https://images.meesho.com/images/marketing/1588578650850.png"/>
            </div>
        </div>
      </div>
    </div>
    
  )
}

export default Cart