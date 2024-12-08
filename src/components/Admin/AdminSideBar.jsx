import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate hook for redirection
import { FaUserGraduate, FaUserTie, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../styles/adminsidebar.css";

const AdminSideBar = () => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate(); // to handle redirect

  // Function to toggle the visibility of sections in the sidebar
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Logout handler
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo">Placement Portal</div>
      <ul className="menu">
        {/* Student Section */}
        <li onClick={() => toggleSection("student")}>
          <FaUserGraduate /> Student
          {openSection === "student" ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {openSection === "student" && (
          <ul className="submenu">
            <li>
              <Link to="/admin/insertstudent">Insert Student</Link>
            </li>
            <li>
              <Link to="/admin/deletestudent">Delete Student</Link>
            </li>
            <li>
              <Link to="/admin/updatestudent">Update Student</Link>
            </li>
            <li>
              <Link to="/admin/viewallstudents">View All Students</Link>
            </li>
          </ul>
        )}

        {/* Recruiter Section */}
        <li onClick={() => toggleSection("recruiter")}>
          <FaUserTie /> Recruiter
          {openSection === "recruiter" ? <FaChevronUp /> : <FaChevronDown />}
        </li>
        {openSection === "recruiter" && (
          <ul className="submenu">
            <li>
              <Link to="/admin/addrecruiter">Add Recruiter</Link>
            </li>
            <li>
              <Link to="/admin/deleterecruiter">Delete Recruiter</Link>
            </li>
            <li>
              <Link to="/admin/updaterecruiter">Update Recruiter</Link>
            </li>
            <li>
              <Link to="/admin/viewallrecruiter">View All Recruiters</Link>
            </li>
          </ul>
        )}
      </ul>
      <div>
        {/* Log out link with handler */}
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default AdminSideBar;