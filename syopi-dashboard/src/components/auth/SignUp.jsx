import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./client";
import logo from '../../assets/logo.png';

import { useAuth } from "./Context.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    accType: "",
    address: "",
  });

  const { user, session, login } = useAuth();

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
      const checkemail = await supabase.from('UserPublic').select('*').eq('email', formData.email)
      if (checkemail) {
        alert('Email already in use')
        return 'Email already in use'
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            acc_type: formData.accType,
            address: formData.address,
          },
        },
      });

      console.log("User created:", data);
      console.log("Id:", data.user);
      console.log("Error:", error);

      if (error) {
        console.log(error);
      } else {
        const { insertdata, error: insertError } = await supabase
          .from("UserPublic")
          .insert({
            id: data.user.id,
            email: formData.email,
            acc_type: formData.accType,
            address: formData.address,
            full_name: formData.fullName,
          });

        console.log("Insert data:", insertdata);
        console.log("Insert error:", insertError);

        // if (insertError) {
        //   throw insertError;
        // }
        await login(formData.email, formData.password);
        await supabase.from("TempUser").insert({
          id: data.user.id,
          email: formData.email,
        });

        alert("Registration successful!");
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
    <div>
      <img src={logo} className='login-img'/>
    <form onSubmit={handleSubmit} className='login-container login-page'>
      <div className='row login-title' style={{margin:'0'}}>
      <p>Sign Up</p>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Fullname</p>
        </div>
        <div className='col-8'>
        <input placeholder="Fullname" name="fullName" onChange={handleChange} />

        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Email</p>
        </div>
        <div className='col-8'>
        <input placeholder="Email" name="email" onChange={handleChange} />
        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Address</p>
        </div>
        <div className='col-8'>
        <input placeholder="address" name="address" onChange={handleChange} />

        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Account Type</p>
        </div>
        <div className='col-8'>
        <select name="accType" value={formData.accType} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
          <option value="courier">Courier</option>
        </select>

        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p>Password</p>
        </div>
        <div className='col-8'>
        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
        <button type='submit'>
          Submit
        </button>

        </div>
      </div>
      </form>
      <div className='row'>
        <div className='col-12'>
        Already have an account?<Link to="/login">Login</Link> 
        </div>
      </div>
    </div>
    
    </>
  );
};

export default SignUp;
