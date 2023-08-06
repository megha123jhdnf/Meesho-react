import React, { useContext, useEffect, useState } from "react";
import "../Components/CSS Files/Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext"
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import "../Components/CSS Files/AddProducts.css";

const Navbar = () => {
  const { state, Login, Logout } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [dropdown, setDropdown] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Other",
  });
  const [addition, setAddition] = useState(false);
  const [proo, setproo] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    if (state) {
      setUserData(state.user);
    }
  }, [state]);

  // -------------------------**POPUP**--------------------------

  function down() {
    setDropdown(true);
  }

  function up() {
    setDropdown(false);
  }

  // ---------------------------****------------------------------

  // --------------------------**ADD PRODUCT**--------------------------

  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      productData.name &&
      productData.price &&
      productData.image &&
      productData.category
    ) {
      const productsArray = JSON.parse(localStorage.getItem("Products")) || [];

      const randomId = uuidv4();
      productData["id"] = randomId;
      productsArray.push(productData);
      localStorage.setItem("Products", JSON.stringify(productsArray));
      setProductData({ name: "", price: "", image: "", category: "Other" });
      router("/allproducts");
      toast.success("Product added Successfully!");
    } else {
      toast.error("Please fill all the data!");
    }
  };

  function selectRole(event) {
    setProductData({ ...productData, ["category"]: event.target.value });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Current-user"));
    if (user) {
      if (user?.role == "Buyer") {
        toast.error("Access granted only to Seller.");
        router("/");
      }
    } else {
      toast.error("You are not a Logged in user.");
      router("/login");
    }
  }, []);

  function addOpen() {
    setAddition(true);
  }

  function addClose() {
    setAddition(false);
  }

  // -----------------------------****--------------------------------------

  // ------------------------------**UPDATE PROFILE**-------------------------

  const proopen = () => {
    setproo(true);
  };

  const proclose = () => {
    setproo(false);
  };

  //   console.log(userData, "userData");

  useEffect(() => {
    if (state) {
      setUserData(state?.user);
    }
  }, [state]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("Current-user"));
    if (!currentUser) {
      router("/login");
    }
    const allUsers = JSON.parse(localStorage.getItem("Users"));
    if (currentUser && allUsers) {
      for (var i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == currentUser.email &&
          allUsers[i].password == currentUser.password
        ) {
          setUserData(allUsers[i]);
        }
      }
    }
  }, []);

  function handleChangeprofile(event) {
    setUserData({...userData,[event.target.name]:event.target.value });
  }

  function handleSubmitprofile(event) {
    event.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("Current-user"));
    const allUsers = JSON.parse(localStorage.getItem("Users"));
    for (var i = 0; i < allUsers.length; i++) {
      if (
        allUsers[i].email === currentUser?.email &&
        allUsers[i].password === currentUser?.password
      ) {
        allUsers[i].name = userData?.name;
        allUsers[i].password = userData?.password;
        currentUser.password = userData?.password;
        currentUser.name = userData?.name;
      }
    }
    Login(currentUser);
    localStorage.setItem("Current-user", JSON.stringify(currentUser));
    localStorage.setItem("Users", JSON.stringify(allUsers));
    setUserData({});
    toast.success("Profile updated.");
  }

  // ----------------------------------****------------------------------------

  return (
    <div>
      {/* -----------------------------**POPUP**----------------------------- */}
      {dropdown ? (
        <div>
          {userData?.name ? (
            <div onMouseLeave={up} id="popin">
              <div>
                <div>
                  <i class="fa-solid fa-circle-user fa-2xl"></i>
                </div>
                <div>
                  <p>
                    <b>Hello {userData.name} </b>
                  </p>
                  <p>+9175******54</p>
                </div>
                <div>
                  <i onClick={proopen} class="fa-regular fa-pen-to-square fa-xl"></i>
                </div>
              </div>
              <div>
                <div>
                  <i class="fa-solid fa-bag-shopping"></i>
                  <p>My Orders</p>
                </div>
                <div>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  <p onClick={Logout}>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <div onMouseLeave={up} id="popup">
              <div>
                <p>
                  <b>Hello User</b>
                </p>
                <p>To access your Meesho account</p>
                <button onClick={() => router("/register")}>SignUp</button>
              </div>
              <div>
                <i class="fa-solid fa-bag-shopping"></i>
                <p>My Orders</p>
              </div>
            </div>
          )}
        </div>
      ) : null}
      {/* --------------------------------**ADD PRODUCT**----------------------- */}

      {addition ? (
        <div  id="addpro">
          <div id="addone">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <label>Product Name:</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                />
                <br />

                <label>Product Price :</label>
                <br />
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                />
                <br />
                <label>Product Category :</label>
                <br />
                <select onChange={selectRole}>
                  <option value="Other">Other</option>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Kids">Kids</option>
                  <option value="Electronics">Electronics</option>
                </select>
                <br />
                <label>Product Image :</label>
                <br />
                <input
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                />
                <br />
                <button value="Add Product" onMouseLeave={addClose}>Add Product</button>
              </fieldset>
            </form>
          </div>
        </div>
      ) : null}

      {/* -----------------------------------**UPDATE PROFILE**---------------------------------- */}

      {proo ? (
        <div id="propop">
          <div>
            <i onClick={proclose} class="fa-solid fa-xmark fa-xl"></i>
            <form onSubmit={handleSubmitprofile}>
              <label>Change Name :</label>
              <br />
              <input
                type="text"
                value={userData.name}
                name="name"
                onChange={handleChangeprofile}
              />
              <br />
              <label>Change Password :</label>
              <br />
              <input
                type="password"
                value={userData.password}
                name="password"
                onChange={handleChangeprofile}
              />
              <br />
              <button onMouseLeave={proclose}>Update Profile</button>
            </form>
          </div>
        </div>
      ) : null}

      {/* ----------------------------------------***----------------------------------------------- */}

      <div id="navbar">
        <div id="nalo">
          <div id="naone">
            <div id="napic">
              <img
                onClick={() => router("/")}
                src="https://cdni.autocarindia.com/utils/imageresizer.ashx?n=http://img.haymarketsac.in/campaignindia/campaign-india/content/20230608033843_meesholead.png&w=800&h=520&q=70&c=1"
              />
            </div>
            <div id="nasearch">
              <i class="fa-solid fa-magnifying-glass fa-lg"></i>
              <input placeholder=" Try Saree, Kurti or Search by Product Code" />
            </div>
          </div>
          <div id="natwo">
            <div id="naapp">
              <i class="fa-solid fa-mobile-screen-button fa-lg"></i>
              <p>Download App</p>
            </div>

            {userData?.role === "Seller" ? (
              <div id="nasupp">
                <p onClick={addOpen}>
                  <b>+</b> Add Products
                </p>
              </div>
            ) : (
              <div id="nasupp">
                <p>Become a Supplier</p>
              </div>
            )}

            <div id="naprofile">
              <div>
                <i class="fa-solid fa-user"></i>
                <p onMouseOver={down}>Profile</p>
              </div>
              <div>
                <i class="fa-solid fa-heart"></i>

                <p>Wishlist</p>
              </div>
              <div>
                <i
                  onClick={() => router("/cart")}
                  class="fa-solid fa-cart-shopping"
                ></i>
                <p>Cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="navdown">
        <p onClick={() => router("/allproducts")}>Women Ethnic</p>
        <p>Women Western</p>
        <p>Men</p>
        <p>Kids</p>
        <p>Home & Kitchen</p>
        <p>Beauty & Health</p>
        <p>Jewellery & Accesories</p>
        <p>Bags & Footwear</p>
        <p>Electronics</p>
      </div>
    </div>
  );
};

export default Navbar;
