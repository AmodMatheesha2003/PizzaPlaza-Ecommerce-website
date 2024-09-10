import React,{ useContext,useEffect,useState } from 'react'
import './FoodDisplay.css'  
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category }) => {
    
    const[menu,setMenu] = useState([]);

    useEffect(() => {
      //fetch("http://localhost:8081/menu/items")
      fetch("http://localhost:2025/menu/items") //api
          .then(response => response.json())
          .then(data => {
              console.log('Fetched data:', data);
              setMenu(Array.isArray(data) ? data : []);
          })
          .catch(error => console.error('Error fetching menu:', error));
      }, []);
  
  return (
    <div className='food-display' id='food-display'>
        <h2 id='recommend'>Recommend</h2>  
        <div className="food-display-list">
            {menu.map((menuItem)=>{
              if(category==="All" || category===menuItem.category){
                return (<FoodItem 
                key={menuItem.id} 
                id={menuItem.id} 
                name={menuItem.name} 
                description={menuItem.description} 
                price={menuItem.price} 
                image={menuItem.image} 
                />
                );
              }
              return null;
            })}
        </div>
    </div>
  )
}

export default FoodDisplay