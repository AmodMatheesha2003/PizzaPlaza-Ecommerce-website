import React,{ useEffect,useState} from "react";
import './List.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const[menu,setmenu] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2025/menu/items")
        // fetch("http://localhost:8081/menu/items")
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setmenu(Array.isArray(data) ? data : []);
            })
            .catch(error => console.error('Error fetching menu:', error));
    }, []);

    const removeFood = (id) => {
      fetch(`http://localhost:8081/menu/item/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setmenu(menu.filter(menuItem => menuItem.id !== id));
          console.log('Deleted successfully');
          toast.success('Deleted successfully')
        } else {
          console.error('Failed to delete');
          toast.error('Failed to delete')
        }
      })
      .catch(error => console.error('Error:', error));
    };
    
  return (
    <div className='list add flex-colm'>
      <ToastContainer/>
      <h2 className="list-topic">All Food List</h2>
      <div className="list-tabel">
        <div className="list-tabel-format tittle">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Description</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {menu.map(menuitem =>(
                    <div key={menuitem.id} className="list-tabel-format">
                        <img src={`data:image/jpeg;base64,${menuitem.image}`} alt="menuitem"/>
                        <p>{menuitem.name}</p>
                        <p>Rs.{menuitem.price}</p>
                        <p>{menuitem.description}</p>
                        <p>{menuitem.category}</p>
                        <p onClick={()=>removeFood(menuitem.id)} className="delete">x</p>
                    </div>
                ))}
      </div>
    </div>
  )
}

export default List
