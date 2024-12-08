import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSideBar from './AdminSideBar'

function AdminHome() {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect to login if the condition is not met
    }
  }, [navigate]);
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(src/images/admin.jpg)`, // Adjusted for correct image reference
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Keeps the background fixed
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#343a40',
      color: '#ffffff',
    },
    content: {
      flex: 1,
      padding: '20px',
    },
  };
  

  return (
    <div style={styles.container}>
      {/* Sidebar Section */}
      <div style={styles.sidebar}>
        <AdminSideBar />
      </div>

      {/* Main Content Section */}
      <div style={styles.content}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is the admin home page where you can manage all the operations.</p>
      </div>
    </div>
  );
}

export default AdminHome;