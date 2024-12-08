import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar'; // Assuming you have a sidebar component
import '../../styles/studentupdate.css'; // You can keep or change the CSS to match your needs
import { useNavigate } from 'react-router-dom'


const RecruiterUpdate = () => {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    // Session check
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect to login if session is invalid or role is not admin
    }
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/viewallrecruiters');
        setRecruiters(response.data);
      } catch (err) {
        console.error('Failed to fetch recruiters:', err);
      }
    };

    fetchRecruiters();
  }, [navigate]);

  const handleEdit = (id) => {
    const selectedRecruiter = recruiters.find((rec) => rec.recruiterId === id);
    setEditRow(id);
    setEditData(selectedRecruiter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/updaterecruiter`, editData);
      setRecruiters((prev) =>
        prev.map((rec) => (rec.recruiterId === id ? { ...rec, ...editData } : rec))
      );
      setEditRow(null);
    } catch (err) {
      console.error('Failed to update recruiter:', err);
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <h3>Update Recruiter Details</h3>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((rec) => (
              <tr key={rec.recruiterId}>
                {editRow === rec.recruiterId ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="company"
                        value={editData.company}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="contactNumber"
                        value={editData.contactNumber}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="industry"
                        value={editData.industry}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="websiteurl"
                        value={editData.websiteurl}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <button className="save-btn" onClick={() => handleSave(rec.recruiterId)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditRow(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{rec.name}</td>
                    <td>{rec.company}</td>
                    <td>{rec.email}</td>
                    <td>{rec.contactNumber}</td>
                    <td>{rec.industry}</td>
                    <td>{rec.location}</td>
                    <td>{rec.websiteurl}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(rec.recruiterId)}>Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminSideBar />
    </div>
  );
};

export default RecruiterUpdate;
