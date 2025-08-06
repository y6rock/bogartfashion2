import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PromotionsBanner from '../components/PromotionsBanner';
import './Home.css'; // Import the new CSS file

// Import existing images as fallbacks
import laptopsImage from '../assets/images/laptops.jpeg';
import smartphonesImage from '../assets/images/smartphones.jpg';
import desktopsImage from '../assets/images/desktops.jpeg';
import gamingMouseImage from '../assets/images/gaming_mouse.jpg';
import keyboardsImage from '../assets/images/keyboards.jpg';
import monitorsImage from '../assets/images/monitors.jpeg';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsRes = await axios.get('/api/products');
        setProducts(productsRes.data);
      } catch (err) {
        console.error('Error fetching data for home page:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading content...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>;
  }

  const displayCategories = [
    { name: 'Men\'s Fashion', description: 'Sophisticated men\'s clothing including suits, casual wear, and formal attire. Discover timeless style and modern elegance.', imageUrl: laptopsImage },
    { name: 'Women\'s Fashion', description: 'Elegant women\'s clothing featuring dresses, tops, skirts, and formal wear. Express your unique style with our curated collection.', imageUrl: smartphonesImage },
    { name: 'Accessories', description: 'Complete your look with our premium accessories including belts, scarves, hats, and fashion jewelry to enhance your style.', imageUrl: desktopsImage },
    { name: 'Shoes', description: 'Step into style with our collection of footwear including formal shoes, casual sneakers, and elegant heels for every occasion.', imageUrl: gamingMouseImage },
    { name: 'Bags & Handbags', description: 'Carry your essentials in style with our collection of designer bags, handbags, and luggage for every need.', imageUrl: keyboardsImage },
    { name: 'Jewelry', description: 'Adorn yourself with our exquisite jewelry collection featuring rings, necklaces, earrings, and watches for that perfect finishing touch.', imageUrl: monitorsImage },
  ];

  return (
    <div className="home-container">
      {/* Promotions Banner */}
      <PromotionsBanner />
      
      {/* Hero Section */}
      <section className="hero-section">
        <h1>BogartFashion</h1>
        <p>Discover timeless elegance and contemporary style in our curated fashion collection</p>
        <Link to="/products" className="explore-button">
          Explore Collection
        </Link>
      </section>

      {/* Product Categories Section */}
      <div className="categories-container">
        {displayCategories.map((category) => (
          <div key={category.name} className="category-card">
            <div className="image-container">
              <img src={category.imageUrl} alt={category.name} />
            </div>
            <div className="text-container">
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <Link to={`/products?category=${category.name}`} className="explore-link">
                Explore {category.name.split('\'')[0]}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;