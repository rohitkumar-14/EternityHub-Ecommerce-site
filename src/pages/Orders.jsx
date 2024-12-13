import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="py-4 border-t text-gray-700 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-4">
                    <p className="sm:text-base font-medium">
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="sm:text-base font-medium">
                      Total: {currency}
                      {order.orderTotal}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm md:text-base">
                    Status: {order.status || "Processing"}
                  </p>
                  <p className="min-w-2 h-2 rounded-full bg-yellow-500"></p>
                </div>
                <button className="border px-4 py-2 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between border p-4 rounded-sm shadow-sm">
                    <img
                      className="w-16 sm:w-20"
                      src={item.productImage[0]}
                      alt={item.productName}
                    />
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm">Size: {item.size || "N/A"}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                      <p className="text-sm">
                        Price: {currency}
                        {item.productPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
