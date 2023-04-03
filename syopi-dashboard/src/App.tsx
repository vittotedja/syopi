import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./components/Browse/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductPage from "./components/Product/ProductPage";
import Review from "./components/Review/Review";
import User from "./components/User";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Homepage from "./components/auth/Homepage";
import PrivateRoute from "./components/auth/Priv";
import "./App.css";

import Seller from "./components/Seller/Seller";
import AddProduct from "./components/Seller/AddProduct";
import SearchPage from "./components/Search/Search";

import Success from "./components/Success";
import Confirmation from "./components/Payment/Confirmation";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop/:shopName" element={<ShopPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/seller" element={<Seller />} />
          <Route path="/seller/addproduct" element={<AddProduct/>} />
        <Route element={<PrivateRoute role='seller'/>}>
          
        </Route>
        <Route element={<PrivateRoute allaccess='true'/>}>
          <Route path="/user" element={<User />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path={"/homepage"} element={<Homepage />} />
        </Route>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}
