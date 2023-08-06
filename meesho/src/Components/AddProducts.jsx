import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import '../Components/CSS Files/AddProducts.css'

const AddProducts = () => {

    const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "Other" });

    const router = useNavigate();

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (productData.name && productData.price && productData.image && productData.category) {
            const productsArray = JSON.parse(localStorage.getItem("Products")) || [];

            const randomId = uuidv4();
            productData["id"] = randomId;
            productsArray.push(productData);
            localStorage.setItem("Products", JSON.stringify(productsArray))
            setProductData({ name: "", price: "", image: "", category: "Other" })
            router('/allproducts');
            toast.success("Product added Successfully!")
        } else {
            toast.error("Please fill all the data!")
        }
    }

    function selectRole(event) {
        setProductData({ ...productData, ["category"]: event.target.value })
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Current-user"))
        if (user) {
            if (user?.role == "Buyer") {
                toast.error("Access granted only to Seller.")
                router('/')
            }
        } else {
            toast.error("You are not a Logged in user.")
            router('/login')
        }
    }, [])
    
  return (
    <div>
    <div id='addone'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          {/* <legend>Fill your Details</legend> */}
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
          <label>Product Category :</label><br />
                <select 
                onChange={selectRole} >
                    <option value="Other">Other</option>
                    <option value="Mens">Mens</option>
                    <option value="Womens">Womens</option>
                    <option value="Kids">Kids</option>
                    <option value="Electronics">Electronics</option>
                </select><br />
          <label>Product Image :</label>
          <br />
          <input
            type="text"
            name="image"
            value={productData.image}
            onChange={handleChange}
          />
          <br />
          <button value="Add Product">Add Product</button>
        </fieldset>
      </form>
    </div>
    </div>
  )
}

export default AddProducts
