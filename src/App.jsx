import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import ProductsPage from './pages/ProductsPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import ManageUsers from './components/ManagaeUsers'
import ManageProducts from './components/ManageProducts'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer  />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          } />
        <Route path='/orders' element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
        <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute role="admin">
            <ManageProducts />
          </ProtectedRoute>
        }
      />
      </Routes>
      <Footer />
    </div>
  )
}

export default App