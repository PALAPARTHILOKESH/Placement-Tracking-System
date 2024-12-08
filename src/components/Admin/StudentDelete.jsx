import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar'; // Assuming you have a sidebar component
import "../../styles/studentdelete.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


const StudentDelete = () => {
  const [students, setStudents] = useState([]);
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

    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/viewallstudents');
        console.log(response.data);
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch students data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/admin/deletestudent/${id}`);
        toast(response.data);
        setStudents(students.filter(student => student.id !== id));
      } catch (err) {
        toast('Failed to delete the student');
      }
    }
  };

  const filteredStudents = students.filter(stu =>
    String(stu.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
    stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stu.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
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

        <h3>Student Details</h3>
        {filteredStudents.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>CGPA</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Program</th>
                <th>Department</th>
                <th>Graduation Year</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stu) => (
                <tr key={stu.id}>
                  <td>{stu.id}</td>
                  <td>{stu.name}</td>
                  <td>{stu.cgpa}</td>
                  <td>{stu.phoneNumber}</td>
                  <td>{stu.email}</td>
                  <td>{stu.program}</td>
                  <td>{stu.department}</td>
                  <td>{stu.graduationYear}</td>
                  <td>{stu.username}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(stu.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No student data available.</div>
        )}
      </div>
      <AdminSideBar />
    </div>
  );
};

export default StudentDelete;
