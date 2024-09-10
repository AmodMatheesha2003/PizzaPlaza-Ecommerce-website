import React,{ useEffect,useState} from "react";
import { assets } from '../../assets/assets'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserList.css'

const UserList = () => {
    const[user,setuser] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2025/user/all")
        // fetch("http://localhost:8080/user/all")
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setuser(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    const removeFood = (id) => {
      fetch(`http://localhost:8080/user/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setuser(user.filter(userItem => userItem.id !== id));
          console.log('Deleted successfully');
          toast.success('Deleted successfully')
        } else {
          console.error('Failed to delete');
          toast.error('Failed to delete')
        }
      })
      .catch(error => console.error('Error:', error));
      // toast.error('Failed to delete')
    };

  return (
    <div className='list add flex-colm'>
      <ToastContainer/>
      <h2 className="list-topic">All Food List</h2>
      <div className="list-tabel">
        <div className="list-tabel-format2 tittle">
         <b>uid</b>
          <b>Name</b>
          <b>Email</b>
          <b>Mobile</b>
          <b>Address</b>
          <b>Action</b>
        </div>
        {user.map(useritem =>(
                    <div key={useritem.id} className="list-tabel-format2">
                      <p>{useritem.id}</p>
                        <p>{useritem.name}</p>
                        <p>{useritem.email}</p>
                        <p>{useritem.mobile}</p>
                        <p>{useritem.address}</p>
                        <p onClick={()=>removeFood(useritem.id)} className="delete">x</p>
                    </div>
                ))}
      </div>
    </div>
  )
}

export default UserList
