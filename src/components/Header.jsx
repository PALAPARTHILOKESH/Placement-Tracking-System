import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#343a40', // Dark background
      color: '#ffffff',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '1.5rem',
      margin: 0,
    },
    tagline: {
      fontSize: '1rem',
      margin: '5px 0 0',
      fontStyle: 'italic',
    },
    buttonContainer: {
      display: 'flex',
      gap: '15px',
    },
    button: {
      padding: '10px 15px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff', // Blue button
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = '#0056b3'; // Darker blue on hover
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = '#007bff'; // Reset to original blue
  };

  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>Career Connect</h1>
        <p style={styles.tagline}>Gateway to the Exciting Opportunities</p>
      </div>
      <div style={styles.buttonContainer}>
        <Link to="/" style={styles.button}>Home</Link>
        <Link to="/about" style={styles.button}>About</Link>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/contact" style={styles.button}>Contact</Link>
      </div>
    </header>
  );
};

export default Header;
