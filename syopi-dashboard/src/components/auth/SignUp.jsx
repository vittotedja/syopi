import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./Client";

import { useAuth } from "./Context.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    wallet: "",
  });

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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            wallet: 0,
          },
        },
      });

      console.log(data);
      if (error) {
        if (error.code === "auth/email-already-in-use") {
          alert(
            "An account with this email already exists. Please sign in instead."
          );
        } else {
          throw error;
        }
      } else {
        const { user, error: syncerror } = await supabase
          .from("ShopManaged")
          .insert({ id: data.user.id });
        console.log(data.user.id);
        if (syncerror) {
          console.log(syncerror);
          throw syncerror;
        }
      }
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Fullname" name="fullName" onChange={handleChange} />

        <input placeholder="Email" name="email" onChange={handleChange} />

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
