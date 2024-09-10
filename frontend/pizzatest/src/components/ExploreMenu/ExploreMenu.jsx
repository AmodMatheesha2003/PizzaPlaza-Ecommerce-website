import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Discover a world of flavors with our carefully curated menu. Whether you're craving classic pizzas, artisanal creations, or something entirely new, we have the perfect dish to satisfy your appetite. From quick bites to indulgent meals, every option is crafted with the finest ingredients to deliver an unforgettable dining experience. Dive in and explore your next delicious order is just a click away!</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
                <p>{item.menu_name}</p> 
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}


export default ExploreMenu
