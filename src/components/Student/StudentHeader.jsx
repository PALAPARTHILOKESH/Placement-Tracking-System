import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function StudentHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('role');
    
    // Redirect to login
    navigate('/login');
  };

  const styles = {
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '250px',
      backgroundColor: '#343a40',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    title: {
      fontSize: '2rem',
      color: '#ffffff',
      margin: 0,
      paddingBottom: '20px',
      borderBottom: '2px solid #ffffff',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginTop: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#28a745',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <aside style={styles.sidebar}>
      <h1 style={styles.title}>Placement Portal</h1>
      <div style={styles.buttonContainer}>
        <Link to='/student/profile' style={{ ...styles.button, textDecoration: 'none' }}>
          Profile
        </Link>
        <Link to='/student/jobs' style={styles.button}>
          Jobs
        </Link>
        <Link to='/student/applied' style={styles.button}>
          Applied
        </Link>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default StudentHeader;
