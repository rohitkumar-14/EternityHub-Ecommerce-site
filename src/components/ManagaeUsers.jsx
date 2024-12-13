import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { navigate } = useContext(ShopContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/updateUserRole/${userId}`,
        { role: newRole }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/deleteUser/${userId}`
        );
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user");
      }
    }
  };
  return (
    <div className="my-24">
      <button
        onClick={() => navigate("/admin")}
        className="ml-4 px-3 py-2 bg-black text-white">
        BACK
      </button>
      <div className="text-center text-3xl py-2">
        <Title text1={"MANAGE"} text2={"USERS"} />
      </div>
      <div className="flex flex-col items-center">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {/* Role Change */}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  {/* Delete User */}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="ml-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
