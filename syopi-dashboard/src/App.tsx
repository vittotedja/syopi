import React, { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./components/Browse/LandingPage";
import ShopPage from "./components/Shop/ShopPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductPage from "./components/Product/ProductPage";
import Review from "./components/Review/Review";
import User from "./components/User";
import Cart from "./components/Cart/Cart";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";
import Homepage from "./components/auth/Homepage.jsx";
import PrivateRoute from "./components/auth/Priv.jsx";
import "./App.css";
import SearchPage from "./SearchPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop/:shopName" element={<ShopPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/review" element={<Review />} />
        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<User />} />
          <Route path="/cart" element={<Cart />} />
          <Route path={"/homepage"} element={<Homepage />} />
        </Route>
        <Route path={"/signup"} element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/shop/:shopName" element={<ShopPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/:productId" element={<ProductPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
