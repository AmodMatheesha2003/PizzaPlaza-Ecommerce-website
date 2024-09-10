import React from 'react'
import './Header.css'

const Header = () => {
  const scrollToMenu = () => {
    const element = document.getElementById('explore-menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Your Favorite Pizza Now</h2>
            <p>Indulge in the ultimate pizza experience. Browse through our tempting menu and order your favorites with just a few clicks. Whether you're in the mood for a hearty meal or a light snack, our selection is crafted to satisfy every craving. Enjoy the ease of online ordering and have your delicious choice delivered fresh to your door. Why wait? Your perfect meal is just a click away!</p>
            <button onClick={scrollToMenu}>View Menue</button>
        </div>
    </div>
  )
}

export default Header
