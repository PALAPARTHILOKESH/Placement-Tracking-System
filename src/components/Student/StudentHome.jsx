import React, { useEffect } from 'react';
import StudentHeader from './StudentHeader';
import { useNavigate } from 'react-router-dom'; // For navigation

function StudentHome() {
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check if the user is logged in as a student
    const studentId = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!studentId || role !== 'student') {
      // Redirect to login if not logged in as a student
      navigate('/login');
    }
  }, [navigate])
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f8f9fa",
      color: "#333",
      minHeight: "100vh",
      padding: "20px",
      marginLeft: "250px", // Adjust this value to match the width of the sidebar
    },
    welcomeSection: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      marginBottom: "20px",
    },
    regulationsSection: {
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "20px",
      lineHeight: "1.6",
    },
    sectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    list: {
      marginLeft: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <StudentHeader />
      <div style={styles.welcomeSection}>
        <h1>Welcome to the Placement Portal</h1>
        <p>Your gateway to career success. Stay informed and prepared!</p>
      </div>
      <div style={styles.regulationsSection}>
        <div style={styles.sectionTitle}>Student Regulations</div>
        <p>
          As a student utilizing the Placement Portal, it’s essential to follow the guidelines to ensure a smooth and professional experience:
        </p>
        <ul style={styles.list}>
          <li>Always keep your profile updated with accurate and verified information.</li>
          <li>Respect deadlines for application submissions and interview schedules.</li>
          <li>Maintain a professional demeanor in all your interactions with recruiters.</li>
        </ul>
        <div style={styles.sectionTitle}>Dos</div>
        <ul style={styles.list}>
          <li>Prepare thoroughly for interviews by utilizing the resources provided.</li>
          <li>Regularly check for updates on job listings and application statuses.</li>
          <li>Attend workshops and guidance sessions to enhance your skills.</li>
        </ul>
        <div style={styles.sectionTitle}>Don'ts</div>
        <ul style={styles.list}>
          <li>Do not share your login credentials with anyone.</li>
          <li>Avoid providing false or misleading information on your profile.</li>
          <li>Do not skip scheduled interviews without prior notice or valid reasons.</li>
        </ul>
      </div>
    </div>
  );
}

export default StudentHome;
