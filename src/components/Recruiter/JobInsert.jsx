import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Don't forget to import useNavigate
import RecruiterSideBar from './RecruiterSideBar';

function JobInsert() {
  const navigate = useNavigate(); // to handle redirect
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: localStorage.getItem('company'),
    location: '',
    salary: '',
    postedDate: new Date().toISOString().split('T')[0],
    recruiter_id: localStorage.getItem('id'), // Ensure recruiter_id is stored correctly in localStorage
  });
  
  const [loading, setLoading] = useState(false); // Loading state for form submission

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not a recruiter
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending job data:', jobData);  // Log the job data before submission
    if (!jobData.recruiter_id) {
      toast.error('Recruiter ID is missing. Please login again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/recruiter/addjob', jobData, {
        params: { recruiterId: jobData.recruiter_id },
      });
      if (response.status === 200) {
        toast.success('Job added successfully!');
        console.log(response.data);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding job';
      toast.error(errorMessage);
      console.error('Error details:', error);
    }
    setJobData({
      title: '',
      description: '',
      company: localStorage.getItem('company'),
      location: '',
      salary: '',
      postedDate: new Date().toISOString().split('T')[0],
      recruiter_id: localStorage.getItem('id'),
    });
  };

  return (<>
        <RecruiterSideBar/>
        <ToastContainer/>
    <div className="job-insert-container">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Job
        </button>
      </form>
    </div>
    </>
  );
}

export default JobInsert;
