import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-48" src={assets.logo1} alt="" />
          <p className="w-full md:w-2/3 text-gray-600">Welcome to EternityHub, where
            fashion meets timeless elegance. We are more than an e-commerce
            site; we are a hub for individuals who value style, quality, and
            sustainability. At EternityHub, we believe fashion should empower
            and inspire, offering a blend of classic and contemporary designs.</p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
               <li>Home</li>
               <li>About us</li>
               <li>Delivery</li>
               <li>Privacy policy</li> 
            </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
               <li>+91 9111100000</li>
               <li>eternityHub@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024@eternityHub.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
