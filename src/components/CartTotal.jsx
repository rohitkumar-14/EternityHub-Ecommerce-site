import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const CartTotal = ({ subtotal, delivery_fee }) => {
  const { currency } = useContext(ShopContext);
  const [realTimeSubtotal, setRealTimeSubtotal] = useState(subtotal);
  const [realTimeDeliveryFee, setRealTimeDeliveryFee] = useState(delivery_fee);

  useEffect(() => {
    setRealTimeSubtotal(subtotal);
    setRealTimeDeliveryFee(delivery_fee);
  }, [subtotal, delivery_fee]);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {realTimeSubtotal}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {realTimeDeliveryFee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {currency} {realTimeSubtotal + realTimeDeliveryFee}.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
