import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  const logoutHandler = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    setIsLoggedIn(false); 
    navigate("/"); 
  };

  if (!isLoggedIn) return null; 

  return (
    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
        
        <NavLink to="/profile">
          <p className="cursor-pointer hover:text-black">My Profile</p>
        </NavLink>
        <NavLink to="/orders">
        <p className="cursor-pointer hover:text-black">Orders</p>
        </NavLink>
        <p className="cursor-pointer hover:text-black" onClick={logoutHandler}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
