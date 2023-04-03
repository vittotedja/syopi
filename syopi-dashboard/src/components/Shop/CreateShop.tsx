import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


function CreateShop() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:5005/shop/add_shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ShopName: name,
        ShopAddress: address,
        ShopPhoneNumber: phone,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // shop added successfully, call function to update user database with shop name
          const updateUserDatabase = (shopName) => {
            fetch("http://127.0.0.1:5006/user/openshop", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                shopname: shopName,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  // user database updated successfully
                  console.log("Shop registration successful!");
                  
                } else {
                  // handle error response from server
                  throw new Error("User database update failed.");
                  window.location.href = "/seller";
                }
              })
              .catch((error) => {
                console.log(error);
              });
          };
          updateUserDatabase(name);
        } else {
          // handle error response from server
          throw new Error("Shop registration failed.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Shop Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <button type="submit">Register Shop</button>
    </form>
  );
}

export default CreateShop;
