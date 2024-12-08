import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar'; // Assuming you have a sidebar component
import { useNavigate } from 'react-router-dom'


const RecruiterViewAll = () => {
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
    }

    const fetchRecruiterData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/viewallrecruiters');
        setRecruiters(response.data);
      } catch (err) {
        setError('Failed to fetch recruiter data');
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterData();
  }, []);

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
      {/* Main Content */}
      <div className="main-content">
        <div>{loading ? 'Loading...' : ''}</div>

        {/* Error State */}
        <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>

        <div>
          <input
            type="text"
            placeholder="Search by name, ID, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Recruiters List */}
        <h3>Recruiter Details</h3>
        {filteredRecruiters.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Industry</th>
                <th>Location</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecruiters.map((rec) => (
                <tr key={rec.recruiterId}>
                  <td>{rec.name}</td>
                  <td>{rec.company}</td>
                  <td>{rec.email}</td>
                  <td>{rec.contactNumber}</td>
                  <td>{rec.industry}</td>
                  <td>{rec.location}</td>
                  <td><a href={rec.websiteurl}>{rec.websiteurl}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No recruiter data available.</div>
        )}
      </div>

      {/* Sidebar */}
      <AdminSideBar />
    </div>
  );
};

export default RecruiterViewAll;
