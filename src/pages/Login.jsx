import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post("http://localhost:5000/api/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        toast.success(response.data.message ||"Sign Up successful! Please log in.")
        setCurrentState("Login");
      } else {
        // Call the login API
        response = await axios.post("http://localhost:5000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          })
        );
        toast.success("Login successful!")
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-[90%] sm:max-w-96 m-auto mt-14">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? null : (
          <input
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            className="w-full px-3 py-2 border border-gray-800"
            type="text"
            placeholder="Name"
            required
          />
        )}

        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="w-full px-3 py-2 border border-gray-800"
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          className="w-full px-3 py-2 border border-gray-800"
          type="password"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer">
              Create account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer">
              Login Here
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
