import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecruiterSideBar from './RecruiterSideBar';
import JobApplications from './JobApplications';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

const JobViewall = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null); // To track selected job for applications view
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const recruiterId = localStorage.getItem('id'); // Replace with dynamic recruiter ID as needed
  const navigate = useNavigate(); // to handle redirect

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not a recruiter
    }

    axios
      .get('http://localhost:5000/recruiter/viewalljobs', { params: { id: recruiterId } })
      .then((response) => {
        const jobData = Array.isArray(response.data) ? response.data : [];
        setJobs(jobData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setError('There was an error fetching the jobs.');
        setLoading(false);
      });
  }, [recruiterId]);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <RecruiterSideBar />
      <h1>Jobs</h1>
      {selectedJobId ? (
        <JobApplications id={selectedJobId} />
      ) : jobs.length === 0 ? (
        <p>No jobs found for this recruiter.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                width: '300px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Posted Date:</strong> {job.postedDate}</p>
              <button
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedJobId(job.id)} // Set selected job ID
              >
                View Applications
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobViewall;
