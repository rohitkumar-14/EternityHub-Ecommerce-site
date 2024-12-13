import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const AdminDashboard = () => {
  return (
    <div className="my-24 flex flex-col items-center">
  <div className="text-center text-3xl py-2">
    <Title text1={"ADMIN"} text2={"DASHBOARD"} />
  </div>
  <nav className="flex space-x-6 mt-6">
    <Link
      to="/admin/users"
      className="w-64 p-6 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between text-lg text-gray-800 hover:bg-gray-100 transition-all duration-300"
    >
      <span>Manage Users</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5-5 5M18 12H6"
        />
      </svg>
    </Link>
    <Link
      to="/admin/products"
      className="w-64 p-6 bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-between text-lg text-gray-800 hover:bg-gray-100 transition-all duration-300"
    >
      <span>Manage Products</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5-5 5M18 12H6"
        />
      </svg>
    </Link>
  </nav>
</div>

  );
};

export default AdminDashboard;
