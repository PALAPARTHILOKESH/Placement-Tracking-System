import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar'; // Assuming you have a sidebar component
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RecruiterDelete = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect to login if session is invalid or role is not admin
    } else {
      fetchRecruiterData();
    }
  }, [navigate]);

  const fetchRecruiterData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/viewallrecruiters');
      setRecruiters(response.data);
    } catch (err) {
      setError('Failed to fetch recruiters data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recruiterId) => {
    if (window.confirm('Are you sure you want to delete this recruiter?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/admin/deleterecruiter/${recruiterId}`);
        toast.success(response.data);
        setRecruiters(recruiters.filter(recruiter => recruiter.recruiterId !== recruiterId));
      } catch (err) {
        toast.error('Failed to delete the recruiter');
      }
    }
  };

  const filteredRecruiters = recruiters.filter(rec =>
    String(rec.recruiterId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <div className="main-content">
        {loading && <div>Loading...</div>}
        {/* Error State */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <input
            type="text"
            placeholder="Search by name, ID, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <h3>Recruiter Details</h3>
        {filteredRecruiters.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Industry</th>
                <th>Location</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecruiters.map((rec) => (
                <tr key={rec.recruiterId}>
                  <td>{rec.name}</td>
                  <td>{rec.company}</td>
                  <td>{rec.contactNumber}</td>
                  <td>{rec.email}</td>
                  <td>{rec.industry}</td>
                  <td>{rec.location}</td>
                  <td>{rec.websiteurl}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(rec.recruiterId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No recruiter data available.</div>
        )}
      </div>
      <AdminSideBar />
    </div>
  );
};

export default RecruiterDelete;
