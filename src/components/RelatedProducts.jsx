import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "./ProductItem";
import axios from "axios";
import { toast } from "react-toastify";

const RelatedProducts = ({ category, subCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/related",
          {
            params: { category, subCategory },
          }
        );
        setRelatedProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching related products:", error);
        setIsLoading(false);
      }
    };

    if (category && subCategory) {
      fetchRelatedProducts();
    }
  }, [category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {relatedProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
