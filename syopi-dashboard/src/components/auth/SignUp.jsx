import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./client";

import { useAuth } from "./Context.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    accType: "",
    address: ""
  });

  const { user, session } = useAuth();

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Get JWT token from local storage and create headers object
      const jwt = localStorage.getItem("jwt");
      const header = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const { user, session, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            acc_type: formData.accType,
            address: formData.address
          },
        },
      }, { 
        headers : {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        } 
      });

      console.log(user);
      console.log(session);

      if (error) {
        if (error.code == "auth/email-already-in-use") {
          alert(
            "An account with this email already exists. Please sign in instead."
          );
        } else {
          throw error;
        }
      } else {
        // User created successfully, sign in user and get JWT token
        const { session, error } = await supabase.auth.signIn({
          email: formData.email,
          password: formData.password,
        });

        console.log(session);

        if (error) {
          throw error;
        }

        alert("Registration successful!");

        // JWT token can be accessed from the session object and stored in local storage
        localStorage.setItem("jwt", session.access_token);

        // Redirect user to dashboard or home page
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Fullname" name="fullName" onChange={handleChange} />

        <input placeholder="Email" name="email" onChange={handleChange} />

        <input placeholder="Email" name="email" onChange={handleChange} />
        
        <select name="accType" value={formData.accType} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
          <option value="courier">Courier</option>
        </select>

        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      Already have an account?<Link to="/login">Login</Link>
    </div>
  );
};

export default SignUp;
