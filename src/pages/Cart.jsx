import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { currency, updateQuantity, delivery_fee } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setLoadingProducts(false);
    } catch (error) {
      toast.error("Error fetching products:", error);
    }
  };

  const fetchCartData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.info("Please log in to view your cart.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${user.id}`
      );
      setCartData(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const computeSubtotal = () => {
    return cartData.reduce((total, item) => {
      const product = products.find(
        (product) => product._id === item.productId._id
      );
      return product ? total + product.price * item.quantity : total;
    }, 0);
  };
  useEffect(() => {
    fetchCartData();
    fetchProducts();
    const interval = setInterval(() => {
      fetchCartData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

 
  const handleRemoveItem = async (productId, size) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.info("Please log in to remove items from your cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/remove",
        {
          userId: user.id,
          productId,
          size,
        }
      );
      if (response.data && response.data.cart) {
        setCartData(response.data.cart.items);
        toast.info("Product removed from cart");
      } else {
        toast.info("Error removing product from cart. Please try again.");
      }
    } catch (error) {
      toast.error("Error removing product from cart:", error);
    }
  };

  if (loading || loadingProducts) return <p>Loading...</p>;
  const subtotal = computeSubtotal();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item.productId._id
          );
          if (!productData) {
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700">
                <p>Product data not found for cart item.</p>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt="Product"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => handleRemoveItem(item.productId._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal subtotal={subtotal} delivery_fee={delivery_fee} />
          <div className="w-full text-end">
            <button
              onClick={()=>navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
