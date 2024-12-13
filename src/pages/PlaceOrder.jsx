import React, { useContext, useEffect, useMemo, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [items, setItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigate, delivery_fee } = useContext(ShopContext);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);
  const isUserLoggedIn = () => {
    if (!user || !user.id) {
      toast.info("Please log in to proceed.");
      return false;
    }
    return true;
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartData = async () => {
    if (!isUserLoggedIn()) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${user.id}`
      );
      setCartData(response.data.items);
    } catch (error) {
      toast.error("Error fetching cart data:", error);
    }
  };

  const fetchDeliveryInfo = async () => {
    if (!isUserLoggedIn()) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${user.id}`
      );
      setDeliveryInfo(response.data.deliveryInfo || deliveryInfo);
    } catch (error) {
      toast.error("Failed to fetch delivery information.");
    }
  };

  const clearCartOnServer = async () => {
    if (!isUserLoggedIn()) return;

    try {
      await axios.post("http://localhost:5000/api/cart/clear", {
        userId: user.id,
      });
      setCartData([]);
      navigate("/place-order");
    } catch (error) {
      toast.error("Error clearing cart:", error);
    }
  };

  const computeSubtotal = () =>
    cartData.reduce((total, item) => {
      const product = products.find(
        (product) => product._id === item.productId._id
      );
      return product ? total + product.price * item.quantity : total;
    }, 0);

  const subtotal = useMemo(
    () => computeSubtotal(),
    [cartData, products, delivery_fee]
  );

  const enhanceCartItems = () => {
    const enrichedItems = cartData.map((cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId._id);
      return product
        ? {
            ...cartItem,
            productName: product.name,
            productPrice: product.price,
            productImage: product.image,
          }
        : cartItem;
    });
    setItems(enrichedItems);
  };

  const handleSubmitOrder = async () => {
    if (!isUserLoggedIn()) return;

    const orderData = {
      userId: user.id,
      deliveryInfo,
      paymentMethod: method,
      orderTotal: computeSubtotal() + delivery_fee,
      items,
    };

    try {
      await axios.patch("http://localhost:5000/api/users/updateDeliveryInfo", {
        userId: user.id,
        deliveryInfo,
      });

      const response = await axios.post("http://localhost:5000/api/orders/create",orderData);

      if (response.data.message === "Order created successfully") {
        clearCartOnServer();
        navigate("/orders");
      } else {
        toast.error("Order creation failed");
      }
    } catch (error) {
      toast.error("Error submitting order");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartData();
    fetchDeliveryInfo();
  }, []);

  useEffect(() => {
    if (cartData.length && products.length) enhanceCartItems();
  }, [cartData, products]);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            value={deliveryInfo.firstName}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })
            }
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            value={deliveryInfo.lastName}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })
            }
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          value={deliveryInfo.email}
          onChange={(e) =>
            setDeliveryInfo({ ...deliveryInfo, email: e.target.value })
          }
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          value={deliveryInfo.street}
          onChange={(e) =>
            setDeliveryInfo({ ...deliveryInfo, street: e.target.value })
          }
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            value={deliveryInfo.city}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, city: e.target.value })
            }
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            value={deliveryInfo.state}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, state: e.target.value })
            }
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
            value={deliveryInfo.zipcode}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, zipcode: e.target.value })
            }
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            value={deliveryInfo.country}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, country: e.target.value })
            }
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          value={deliveryInfo.phone}
          onChange={(e) =>
            setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })
          }
        />
      </div>

      <div className="mt-12">
        <div className="mt-8 min-w-80">
          <CartTotal subtotal={computeSubtotal()} delivery_fee={delivery_fee} />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>
        <div className="flex gap-3 flex-col lg:flex-row">
          <div
            onClick={() => setMethod("stripe")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "stripe" ? "bg-green-400" : ""
              }`}></p>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
          </div>
          <div
            onClick={() => setMethod("razorpay")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "razorpay" ? "bg-green-400" : ""
              }`}></p>
            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
          </div>
          <div
            onClick={() => setMethod("cod")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "cod" ? "bg-green-400" : ""
              }`}></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            onClick={handleSubmitOrder}
            className="bg-black text-white text-sm px-16 py-3">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
