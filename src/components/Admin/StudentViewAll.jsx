import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '../../styles/studentviewall.css';
import { useNavigate } from 'react-router-dom'


const StudentViewAll = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error  , setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');
    if (!id || role !== 'admin') {
      navigate('/login'); // Redirect to login if session is invalid or role is not admin
    }
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/viewallstudents');
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch students data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);


  const filteredStudents = students.filter(stu =>
    String(stu.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
    stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stu.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewResume = (pdfUrl) => {
    setSelectedPDF(pdfUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPDF(null);
  };

  return (
    <div className="container">
      <div className="main-content">
        <div>{loading && <p>Loading...</p>}</div>
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
                <th>Resume</th>
                <th>Username</th>
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
                  <td>
                    <button onClick={() => handleViewResume(stu.resumedownloadURL)}>
                      View Resume
                    </button>
                  </td>
                  <td>{stu.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No student data available.</div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
              <div className="viewer-container">
                {selectedPDF && (
                  <>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer 
                        fileUrl={selectedPDF} 
                        defaultScale={SpecialZoomLevel.PageWidth} 
                      />
                    </Worker>
                    <div className="download-container">
                      <a 
                        href={selectedPDF} 
                        download 
                        className="download-button"
                      >
                        Download Resume
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <AdminSideBar />
    </div>
  );
};

export default StudentViewAll;
