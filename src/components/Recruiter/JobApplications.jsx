import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // to handle redirection

function JobApplications({ id }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null); // Stores the resume URL to view
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility
  const navigate = useNavigate(); // to handle redirection

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    
    // Check if the user is logged in and if the role is recruiter
    if (!id || role !== 'recruiter') {
      navigate('/login'); // Redirect if session is invalid or user is not recruiter
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/recruiter/viewapplicationsbyid",
          {
            params: { jobId: id },
          }
        );
        setApplications(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  const handleViewResume = (resumeBase64) => {
    // Convert base64 to a data URI for the iframe
    setSelectedResume(`data:application/pdf;base64,${resumeBase64}`);
    setIsModalOpen(true);
  };
  

  const closeModal = () => {
    setSelectedResume(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Job Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        applications.map((application) => (
          <div
            key={application.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2>{application.name}</h2>
            <p>Email: {application.email}</p>
            <p>University: {application.university}</p>
            <p>Phone Number: {application.phoneNumber}</p>
            <p>Year in University: {application.yearInUniversity}</p>
            <p>Resume:</p>
            <button
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => handleViewResume(application.resumeUrl)} // Pass the resume URL
            >
              View Resume
            </button>
          </div>
        ))
      )}

      {/* Modal Implementation */}
      {isModalOpen && selectedResume && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
            }}
          >
           <iframe
              src={selectedResume}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="Resume"
            />

            <button
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#dc3545",
                color: "#fff",
                cursor: "pointer",
                alignSelf: "center",
              }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobApplications;
