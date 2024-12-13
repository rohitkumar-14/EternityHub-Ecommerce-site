import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    deliveryInfo: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    deliveryInfo: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserData(response.data);
        setUpdatedData({
          name: response.data.name,
          email: response.data.email,
          deliveryInfo: response.data.deliveryInfo,
        });
      } catch (err) {
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();

    const intervalId = setInterval(fetchUserData, 10000);

    return () => clearInterval(intervalId);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in updatedData.deliveryInfo) {
      setUpdatedData({
        ...updatedData,
        deliveryInfo: {
          ...updatedData.deliveryInfo,
          [name]: value,
        },
      });
    } else {
      setUpdatedData({
        ...updatedData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedDeliveryInfo = {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        street: updatedData.street,
        city: updatedData.city,
        state: updatedData.state,
        zipcode: updatedData.zipcode,
        country: updatedData.country,
        phone: updatedData.phone,
      };

      const response = await axios.patch(
        `http://localhost:5000/api/users/update-delivery-info`,
        { userId: userId, deliveryInfo: updatedDeliveryInfo }
      );
      toast.success("Delivery information updated successfully!");
      setUserData(response.data);
      setIsEditing(false);
    } catch (err) {
      toast.error("Error updating user data");
    }
  };

  return (

    <div className="profile-container">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"USER"} text2={"PROFILE"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col gap-6 md:w-2/4 text-gray-600">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  {userData?.deliveryInfo && Object.keys(userData.deliveryInfo).map((key) => (
                    <>
                    <h3 className="text-lg font-bold mb-3">Delivery Information</h3>
                    <div className="mb-4" key={key}>
                      <label className="block text-gray-700 capitalize">
                        {key}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={updatedData.deliveryInfo[key] || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 uppercase">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-black border border-black px-8 py-3 text-sm active:bg-gray-700 uppercase">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4">
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Role: {userData.role}</p>
              <hr className="py-2 mt-2 w-1/2" />
              {userData?.deliveryInfo &&
                Object.entries(userData.deliveryInfo).map(([key, value]) => (
                  <>
                  <h1 className="font-bold mb-2">Delivery Information:</h1>
                  <p key={key}>
                    <span className="capitalize">{key}:</span> {value || "N/A"}
                  </p>
                  </>
                ))}

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 uppercase mt-5">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
