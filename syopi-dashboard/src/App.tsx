import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./components/Browse/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductPage from "./components/Product/ProductPage";
import Review from "./components/Review/Review";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Homepage from "./components/auth/Homepage";
import PrivateRoute from "./components/auth/Priv";

import Seller from "./components/Seller/Seller";
import AddProduct from "./components/Seller/AddProduct";
import SearchPage from "./components/Search/Search";

import Success from "./components/Success";
import Confirmation from "./components/Payment/Confirmation";
import Courier from "./components/Courier/Courier";

import CreateShop from "./components/Shop/CreateShop";
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
        <Route path="/seller/addProduct" element={<AddProduct />} />
        <Route path="/courier" element={<Courier />} />
        <Route path="/shop/CreateShop" element={<CreateShop />} />
        <Route element={<PrivateRoute role='seller'/>}>
        </Route>
        <Route element={<PrivateRoute allaccess='true'/>}>
          <Route path="/user" element={<Homepage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/homepage" element={<Homepage />} />
        </Route>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}
