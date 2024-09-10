import React, { useState } from 'react';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setShowLogin  }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

     
        const response = await fetch('http://localhost:8085/admin/login', {
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
          setFormData({
            ...formData,
            password: ''
          });
          setTimeout(() => {
            setShowLogin(false);
          }, 2000);
        } else {
          toast.error(data || 'Login failed');
          setFormData({
            ...formData,
            password: ''
          });
        }

      
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      setFormData({
        ...formData,
            password: ''
      });
    }
  };

  return (
    <div className='login'>
      <form className='login-popup' onSubmit={handleSubmit}>
        <div className="login-popup-tittle">
          <h2>Admin Login</h2>
          
        </div>
        <div className="login-popup-insert">
          
          <input
            type='email'
            name='email'
            placeholder='Your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          
        
          
        </div>
        <button type="submit">
          Login
        </button>
        
        
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
