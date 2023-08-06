import React, { useEffect, useState } from "react";
import "../Components/CSS Files/AllProducts.css";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {

  const [isProductsExist, setIsProductsExist] = useState(false);
    const [products, setProducts] = useState([]);
    const router = useNavigate()

    useEffect(() => {
      const productsFromDb = JSON.parse(localStorage.getItem("Products"))
      if (productsFromDb) {
          setIsProductsExist(true);
          setProducts(productsFromDb);
      } else {
          setIsProductsExist(false);
          setProducts([]); // Set an empty array if there are no products in localStorage
      }
  }, []);

    const redirect = (id) => {
        console.log(id, "-id");
        router(`/singleproduct/${id}`)
    }

  return (
    <div>
         <div id="allscreen">
     
     </div>
     <div id="allbody">
       <div id="allleft">
         <div>
           <p>All Products</p>
           <p>Showing 81-100 out of 10000 products</p>
         </div>
         <div id="allside">
           <div>
             <span>Sort by:</span>
             <span>
               <select>
                 <option>Relevance</option>
                 <option>Price:High to Low</option>
                 <option>Price:Low to High</option>
                 <option>Discounts</option>
               </select>
             </span>
           </div>
           <div>
             <div>
               <h4>FILTERS</h4>
               <p>1000+ products</p>
             </div>
             <div>
               <select>
                 <option>Categories</option>
                 <option>T-Shirt</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Gender</option>
                 <option>Men</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Fabric</option>
                 <option>Acrylic</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Color</option>
                 <option>Black</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Price</option>
                 <option>Under Rs. 149</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Meesho Mall</option>
                 <option>Mall Brands</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Discount</option>
                 <option>10% and above</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Rating</option>
                 <option>2.0 and above</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>size</option>
                 <option>s</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Combo</option>
                 <option>Combos</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Print or Pattern Type</option>
                 <option>Abstract</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Ornamentation</option>
                 <option>Applique</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Bottom Pattern</option>
                 <option>Floral</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Surface Styling</option>
                 <option>Applique</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>fit/ Shape</option>
                 <option>A-line</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Top Type</option>
                 <option>Tshirt</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Warranty Period</option>
                 <option>1 Month</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Waist Rise</option>
                 <option>Waist Rise</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Bottom type</option>
                 <option>Shorts</option>
                 
               </select>
             </div>
             <div>
               <select>
                 <option>Type</option>
                 <option>Basic</option>
                 
               </select>
             </div>
           </div>
         </div>
       </div>
       <div id="allright">
       {products.map((pro) => (  
         <div onClick={() => redirect(pro.id)}>
           <div>
             <img src={pro.image} />
           </div>
           <p>{pro.name}</p>
           <span>Rs.{pro.price}</span>
           <span>onwards</span>
           <p>Free Delivery</p>
           <div>
             <span>
               <p>3.4</p>
               <i class="fa-solid fa-star fa-xs"></i>
             </span>
             <p>27 Reviews</p>
           </div>
         </div>
        ))}
       </div>
     </div>
    </div>
  )
}

export default AllProducts
