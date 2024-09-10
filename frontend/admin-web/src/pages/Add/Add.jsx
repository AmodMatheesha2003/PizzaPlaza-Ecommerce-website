import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const [name, setName] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('image', image);
    
        try {
            const response = await fetch('http://localhost:8081/menu/item', {
                method: 'POST',
                body: formData
            });
    
            if (response.ok) {
                toast.success('User added successfully!')
                setName('');
                setprice('');            
                setdescription('');            
                setcategory('');            
                setImage(null);
            } else {
                const error = await response.text();
                console.error('Error uploading user data:', error);
                toast.error('Failed to add user.')
            }
        } catch (error) {
            console.error('Error uploading user data:', error);
            toast.error('Failed to add user.')
        }
    };

  return (
    <div className='add'>
        <ToastContainer />
      <form className='flex-colm' onSubmit={handleSubmit}>
        <div className="img-upload flex-colm">
            <p>Upload Image</p>
            <label htmlFor='image'>
                <img src={assets.iconuupload} alt="" />
            </label>
            <input type='file' id="image" onChange={handleFileChange} hidden required></input>
        </div>

        <div className="food-name flex-colm">
            <p>Food Name</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Food Name' required></input>
        </div>

        <div className="food-price flex-colm">
            <p>Food Price</p>
            <input type="Number" value={price} onChange={(e) => setprice(e.target.value)} placeholder='Food Price  (Rs)' required></input>
        </div>

        <div className="food-description flex-colm">
            <p>Food Description</p>
            <textarea name="Description" value={description} onChange={(e) => setdescription(e.target.value)} rows="6" placeholder="Food Description" required></textarea>
        </div>

        <div className="food-category flex-colm">
            <select name="category" id="category" value={category} onChange={(e) => setcategory(e.target.value)} required>
                <option value="" disabled>Select an option</option>
                <option value="Deals">Deals</option>
                <option value="Classic">Classic</option>
                <option value="Favorite">Favorite</option>
                <option value="Signature">Signature</option>
                <option value="Supreme">Supreme</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Pasta">Pasta</option>
                <option value="Desserts">Desserts</option>
                <option value="Drinks">Drinks</option>
            </select>
        </div>
        <button type='submit' className='addbutton'>Add Product</button>
      </form>
    </div>
  )
}

export default Add
