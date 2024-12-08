import React, { useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RecruiterSideBar from './RecruiterSideBar';

const RecruiterHome = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not a recruiter
    }
  }, [navigate]); // Dependency on navigate

  return (
    <div>
      <RecruiterSideBar />
      {/* You can add more content here for the recruiter home page */}
      <h1>Welcome to Recruiter Dashboard</h1>
    </div>
  );
};

export default RecruiterHome;
