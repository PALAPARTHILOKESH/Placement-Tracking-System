import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // for navigation

function StudentApplication({ jobId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    phoneNumber: "",
    yearInUniversity: "",
    resume: null,
  });

  const navigate = useNavigate(); // To handle redirection

  // Check the user's role when the component is mounted
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (!role || role !== "student") {
      navigate("/login"); // Redirect to login if the user is not a student
    }
  }, [navigate]);


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });  
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/; // Example: Validates 10-digit phone numbers
    if (!formData.name || !formData.email || !formData.university || 
        !formData.phoneNumber || !formData.yearInUniversity || !formData.resume) {
      toast.error("All fields are required.");
      return false;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    if (formData.resume && formData.resume.type !== "application/pdf") {
      toast.error("Please upload a valid PDF resume.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("university", formData.university);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("yearInUniversity", formData.yearInUniversity);
    data.append("resume", formData.resume);
    data.append("jobId", jobId); // Add jobId here
    data.append("studentId", localStorage.getItem('id')); // Add studentId here
    
    try {
      const response = await axios.post("http://localhost:5000/student/apply", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          university: "",
          phoneNumber: "",
          yearInUniversity: "",
          resume: null,
        });
        toast.success("Application submitted successfully!");
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer/>
      <h2>Apply for Job ID: {jobId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>University:</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year in University:</label>
          <input
            type="text"
            name="yearInUniversity"
            value={formData.yearInUniversity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Resume:</label>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default StudentApplication;
