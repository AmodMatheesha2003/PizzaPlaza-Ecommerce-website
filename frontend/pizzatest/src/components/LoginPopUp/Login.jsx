import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setShowLogin, setToken, setUserID }) => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }

      if (state === "Login") {
        const response = await fetch('http://localhost:8080/user/login', {
        // const response = await fetch('http://localhost:2025/userService/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.text();
        if (response.ok) {
          toast.success('Login successful');
          setUserID(data);
          setToken(true);
          
          setFormData({
            ...formData,
            name: '',
            password: '',
            mobile: '',
            address: ''
          });
          setTimeout(() => {
            
            setShowLogin(false);
            
          }, 2000);
        } else {
          toast.error(data || 'Login failed');
          setFormData({
            ...formData,
            name: '',
            password: '',
            mobile: '',
            address: ''
          });
        }

      } else if(state === "Sign Up") {
        const response = await fetch('http://localhost:8080/user/signup', {
        // const response = await fetch('http://localhost:2025/userService/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile,
            address: formData.address
          })
        });

        const data = await response.text();
        if (response.ok) {
          toast.success('Account created successfully');
          setFormData({
            ...formData,
            name: '',
            password: '',
            mobile: '',
            address: ''
          });
          setState('Login');
        } else {
          toast.error(data || 'Signup failed');
          setFormData({
            ...formData,
            name: '',
            password: '',
            mobile: '',
            address: ''
          });
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      setFormData({
        ...formData,
            name: '',
            password: '',
            mobile: '',
            address: ''
      });
    }
  };

  return (
    <div className='login'>
      <form className='login-popup' onSubmit={handleSubmit}>
        <div className="login-popup-tittle">
          <h2>{state}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-insert">
          {state === "Sign Up" && (
            <input type='text' name='name' placeholder='Your Name' value={formData.name} onChange={handleChange} required />
          )}
          <input type='email' name='email' placeholder='Your email' value={formData.email} onChange={handleChange} required />
          <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
          {state === "Sign Up" && (
            <input
              type='text' name='mobile' placeholder='Your Mobile' value={formData.mobile} onChange={handleChange} required />
            
          )}
          {state === "Sign Up" && (
            <input type='text' name='address' placeholder='Your address' value={formData.address} onChange={handleChange}  required />
            
          )}
          
        </div>
        <button type="submit">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" && (
          <div className="login-condition">
            <input type="checkbox" required />
            <p>I agree to the terms and conditions.</p>
          </div>
        )}
        {state === "Login" ? (
          <p>Don't have an account? <span onClick={() => setState("Sign Up")}>Create account</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setState("Login")}>Login</span></p>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
