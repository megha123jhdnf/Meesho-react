import React, { useContext, useEffect, useState } from 'react'
import '../Components/CSS Files/SingleProducts.css'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from './Context/AuthContext';

const SingleProduct = () => {

 const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [single, setSingle] = useState({});
  const { id } = useParams();
  const router = useNavigate();
  const { state } = useContext(AuthContext);
  const [isProductExist, setIsProductExist] = useState(false);
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Other",
  });
  const [allowUpdate, setAllowUpdate] = useState(false);

  useEffect(() => {
    if (state) {
      setUserData(state.user);
    }
  }, [state]);

  useEffect(() => {
    const productFromDB = JSON.parse(localStorage.getItem("Products"));
    if (productFromDB) {
      setIsProductExist(true);
      setProducts(productFromDB);
    } else {
      setIsProductExist(false);
    }
  }, []);

  useEffect(() => {
    if (isProductExist) {
      if (id && products.length) {
        const res = products.find((pro) => pro.id == id);
        setSingle(res);
      }
    }
  }, [id, products]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Current-user"));
    // console.log(user, "uzer");
    if (user) {
      setIsUserLoggedIn(true);
      setCurrentUserEmail(user.email);
    }
  }, []);

  function addCart() {
    if (isUserLoggedIn) {
      const users = JSON.parse(localStorage.getItem("Users"));
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === currentUserEmail) {
          users[i].cart.push(single);
          localStorage.setItem("Users", JSON.stringify(users));
          break;
        }
      }
      toast.success("Product successfully added to cart!");
      router("/cart");
    } else {
      toast.error("You can't add a product before logging in!");
    }
  }







  function uptoDate() {
    setAllowUpdate(true);
  }

  function closeUpate() {
    setAllowUpdate(false);
  }

  function handleChange(e) {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }
  function selectRole(e) {
    setProductData({ ...productData, ["category"]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const allProduct = JSON.parse(localStorage.getItem("Products"));
    for (let i = 0; i < allProduct.length; i++) {
      if (allProduct[i].id === id) {
        allProduct[i].image = productData.image;
        allProduct[i].name = productData.name;
        allProduct[i].price = productData.price;
        allProduct[i].category = productData.category;
        single.image = productData.image;
        single.name = productData.name;
        single.price = productData.price;
        single.category = productData.category;

        localStorage.setItem("Products", JSON.stringify(allProduct));
        setProductData({ name: "", price: "", image: "", category: "Other" });
        toast.success("Product Updated!");
      }
    }
  }
  return (
    <div>
        <div id="sgscreen">

        {allowUpdate ? (
        <div id='uppop'>
          <div >
          <i onClick={closeUpate}  class="fa-solid fa-xmark fa-xl"></i>
            <form onSubmit={handleSubmit}>
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
                <select
                  onChange={selectRole}
                >
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
                <button onMouseLeave={closeUpate}>Update Product</button>
            </form>
          </div>
        </div>
       ) : null} 
 
 <div id="sgbody">
   <div id="sgleft">
     <img
       src={single.image}
     />
     <img
       src={single.image}
     />
     <img
       src={single.image}
     />
   </div>
   <div id="sgbet">
     <div>
       <img
         src={single.image}
       />
     </div>

     {userData?.role === "Seller" ?
     <div>
       <button onClick={uptoDate}>Update Product</button>
       <button>Delete</button>
     </div>
        :
     <div>
       <button onClick={addCart}>Add to Cart</button>
       <button>Buy Now</button>
     </div>}


     <div>
       <p>3 Similar Products</p>
       <img
         src="https://images.meesho.com/images/products/64908167/dfego_400.webp"
       />
       <img
         src="https://images.meesho.com/images/products/297732028/ov4ox_400.webp"
       />
       <img
         src="https://images.meesho.com/images/products/223461633/5j0lz_400.webp"
       />
     </div>
   </div>
   <div id="sgright">
     <div>
       <p>{single.name}</p>
       <p>₹{single.price}</p>
       <div>
         <span>
           <p>4.0</p>
           <i class="fa-solid fa-star fa-xs"></i>
         </span>
         <p>273 Ratings, 90 Reviews</p>
       </div>
       <p>Free Delivery</p>
     </div>
     <div>
       <h4>Select Size</h4>
       <div>
         <p>S</p>
         <p>M</p>
         <p>L</p>
         <p>XL</p>
       </div>
     </div>
     <div>
       <h4>Product Details</h4>
       <p>Name : {single.name}</p>
       <p>Fabric : Cotton</p>
       <p>Sleeve Length : NA</p>
       <p>Pattern : Solid</p>
       <p>Net Quantity (N) : 1</p>
       <p>Sizes :</p>
       <p>S, M, L, XL</p>
       <p>Country of Origin : India</p>
       <p>More Information</p>
     </div>
     <div>
       <h4>Sold By</h4>
       <div>
         <img src="https://images.meesho.com/images/pow/shop_100.webp" />
         <p>D.I</p>
         <button>View Shop</button>
       </div>
       <div>
         <span>
           <span>
             <p>4.0</p>
             <i class="fa-solid fa-star fa-xs"></i>
           </span>
           <p>20,701 Ratings</p>
         </span>
         <span>
           <p>2,764</p>
           <p>Followers</p>
         </span>
         <span>
           <p>468</p>
           <p>Products</p>
         </span>
       </div>
     </div>
     <div>
       <h4>Check Delivery Date</h4>
       <input placeholder="Enter Delivery Pincode" />
       <p>Enter Pincode for Estimated Delivery Date</p>
       <p>Dispatch in 2 day</p>
     </div>
     <div>
       <img
         src="https://images.meesho.com/images/value_props/lowest_price_pbd.png"
       />
       <div>
         <p>Lowest</p>
         <p>Price</p>
       </div>

       <img src="https://images.meesho.com/images/pow/cod_jamun.svg" />
       <div>
         <p>Cash on</p>
         <p>Delivery</p>
       </div>

       <img
         src="https://images.meesho.com/images/pow/easyReturns_jamun.svg"
       />
       <div>
         <p>7-day</p>
         <p>Returns</p>
       </div>
     </div>
   </div>
 </div>
</div>
    </div>
  )
}

export default SingleProduct