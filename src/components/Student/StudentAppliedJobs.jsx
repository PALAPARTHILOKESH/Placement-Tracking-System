import React, { useEffect, useState } from 'react';
import StudentHeader from './StudentHeader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // For redirecting

function StudentAppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For redirecting the user if no session found

  useEffect(() => {
    // Check if student is logged in via sessionStorage
    const studentId = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    
    if (!studentId || role !== 'student') {
      toast.error('You must be logged in as a student');
      navigate('/login'); // Redirect to login if session is invalid or user is not a student
      return;
    }

        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/student/viewjobsbyid', {
                    params: { studentId: localStorage.getItem('id') },
                });
                setJobs(response.data);
            } catch (err) {
                setError('Failed to fetch jobs data');
                toast.error('Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <StudentHeader />
            <h2>Applied Jobs</h2>
            {jobs.length > 0 ? (
                <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Job Title</th>
                            <th>Job Company</th>
                            <th>Desciption</th>
                            <th>Location</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.company}</td>
                                <td>{job.title}</td>
                                <td>{job.description}</td>
                                <td>{job.location}</td>
                                <td>{job.salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No jobs applied yet.</p>
            )}
        </div>
    );
}

export default StudentAppliedJobs;
