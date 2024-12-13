import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const { productId } = useParams();
  const { navigate } = useContext(ShopContext);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: [],
    category: "",
    subCategory: "",
    sizes: [],
    date: Date.now(),
    bestseller: false,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/products"
        );
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);
  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/addProducts",
        newProduct
      );
      setProducts([...products, response.data]);
      setShowAddProductForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };
  const handleUpdateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/updateProduct/${productId}`,
        updatedProduct
      );
      alert("Product updated successfully!");
      navigate("/admin/manage-products");
    } catch (err) {
      console.error("Error updating product", err);
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/deleteProduct/${productId}`
        );
        alert("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (err) {
        console.error("Error deleting product", err);
        alert("Failed to delete product");
      }
    }
  };
  return (
    <div className="my-24">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin")}
          className="ml-4 px-3 py-2 bg-black text-white">
          BACK
        </button>
        <button
          onClick={() => setShowAddProductForm(true)}
          className="ml-4 px-3 py-2 bg-black text-white">
          ADD PRODUCT
        </button>
      </div>
      <div className="text-center text-3xl py-2">
        <Title text1={"MANAGE"} text2={"PRODUCTS"} />
      </div>


      {showEditProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="absolute inset-0"
            onClick={() => setShowEditProductForm(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Product Name"
              />
              <textarea
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Product Description"
              />
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Product Price"
              />
              <input
                type="text"
                name="category"
                value={updatedProduct.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Category"
              />
              <input
                type="text"
                name="subCategory"
                value={updatedProduct.subCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Sub-category"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleUpdateProduct}
                  className="px-6 py-2 bg-green-500 text-white rounded">
                  Update Product
                </button>
                <button
                  onClick={() => setShowEditProductForm(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     
      {showAddProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="absolute inset-0"
            onClick={() => setShowAddProductForm(false)}></div>
          <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-3">Add New Product</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Product Name"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <textarea
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                placeholder="Product Description"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Product Price"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image: e.target.value.split(","),
                  })
                }
                placeholder="Image URLs (comma separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                placeholder="Product Category"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                value={newProduct.subCategory}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, subCategory: e.target.value })
                }
                placeholder="Product Sub-Category"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                value={newProduct.sizes}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    sizes: e.target.value.split(","),
                  })
                }
                placeholder="Sizes (comma separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />

              <div>
                <label>
                  <input
                    type="checkbox"
                    className="mx-2"
                    checked={newProduct.bestseller}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        bestseller: e.target.checked,
                      })
                    }
                  />
                  Bestseller
                </label>
              </div>

              <button
                onClick={handleAddProduct}
                className="mt-4 px-6 py-2 bg-black text-white mr-3">
                Add Product
              </button>
              <button
                onClick={() => setShowAddProductForm(false)}
                className="mt-4 px-6 py-2 border border-black text-black">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center overflow-x-auto">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <img src={product.image[0]} alt="" width={45} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <button
                    onClick={() => setShowEditProductForm(true)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
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

export default ManageProducts;
