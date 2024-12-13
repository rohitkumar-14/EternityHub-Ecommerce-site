import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/bestsellers"
        );
        setBestSeller(response.data);
      } catch (error) {
        toast.error("Error fetching bestseller products:", error);
        const fallbackBestSellers = products.filter((product) => product.bestSeller === true);
        setBestSeller(fallbackBestSellers);
      }
    };
    fetchBestSellers();
    const intervalId = setInterval(fetchBestSellers, 5000);
    return () => clearInterval(intervalId);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit Nemo ducimus.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No best sellers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
