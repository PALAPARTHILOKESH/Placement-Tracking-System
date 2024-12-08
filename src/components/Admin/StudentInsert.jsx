import React, { useState, useEffect } from 'react';
import AdminSideBar from './AdminSideBar';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function StudentInsert() {
  const navigate = useNavigate();

  // Initial state for the student form
  const initialState = {
    id: "",
    name: "",
    cgpa: "",
    phoneNumber: "",
    program: "",
    email: "",
    department: "",
    graduationYear: "",
    username: "",
    password: ""
  };

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect if session is invalid or user is not admin
    }
  }, [navigate]);

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false); // Loading state to disable button while submitting

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation for form fields
  const validateFields = () => {
    // Validate phone number to be 10 digits
    if (!/^\d{10}$/.test(data.phoneNumber)) {
      toast.error("Invalid phone number. Must be 10 digits.");
      return false;
    }
    // Validate CGPA to be between 0 and 10
    if (data.cgpa < 0 || data.cgpa > 10) {
      toast.error("Invalid CGPA. Must be between 0 and 10.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return; // Only submit if validation passes

    setLoading(true); // Show loading state during API call

    try {
      const response = await axios.post('http://localhost:5000/admin/addstudent', data,
        {
          params:data
        }
      );
      if (response.data.includes("exists")) {
        toast.error(response.data); // Show error if student already exists
      } else {
        toast.success("Student Added Successfully");
        setData(initialState); // Reset form after success
      }
    } catch (error) {
      toast.error("Error Occurred While Inserting");
      console.error('Error details:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Hide loading state after API call
    }
  };

  return (
    <div className="student-insert-container">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <AdminSideBar />
      <div className="form-wrapper">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input
              type="number"
              name="id"
              value={data.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CGPA</label>
            <input
              type="number"
              step="0.01"
              name="cgpa"
              value={data.cgpa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>Program</label>
            <input
              type="text"
              name="program"
              value={data.program}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={data.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              value={data.graduationYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentInsert;
