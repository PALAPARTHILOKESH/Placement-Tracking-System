import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecruiterSideBar from "./RecruiterSideBar";

const RecruiterProfile = () => {
  const [photo, setPhoto] = useState("");
  const [recruiter, setRecruiter] = useState({
    recruiterId: "",
    name: "",
    company: "",
    email: "",
    contactNumber: "",
    industry: "",
    location: "",
    websiteurl: "",
    username: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const recruiterId = sessionStorage.getItem("id");
    const role = sessionStorage.getItem("role");

    if (!recruiterId || role !== "recruiter") {
      navigate("/login");
    } else {
      const fetchRecruiter = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/recruiter/viewbyid/${recruiterId}`
          );
          const imageBase64 = response.data.photo
            ? `data:image/jpeg;base64,${response.data.photo}`
            : "";
          setPhoto(imageBase64);
          setRecruiter(response.data);
        } catch (error) {
          setError("Error fetching recruiter data");
        } finally {
          setLoading(false);
        }
      };
      fetchRecruiter();
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruiter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setRecruiter((prevState) => ({
      ...prevState,
      photo: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
        "recruiter",
        JSON.stringify({
            recruiterId: recruiter.recruiterId,
            name: recruiter.name,
            company: recruiter.company,
            email: recruiter.email,
            contactNumber: recruiter.contactNumber,
            industry: recruiter.industry,
            location: recruiter.location,
            websiteurl: recruiter.websiteurl,
            username: recruiter.username,
            password: recruiter.password,
        })
    );

    if (recruiter.photo) {
        formData.append("photo", recruiter.photo);
    }

    try {
        const response = await axios.post(
            "http://localhost:5000/recruiter/updaterecruiter",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        if (response.status === 200) {
            alert(response.data || "Recruiter profile updated successfully");
            setIsEditing(false);
        } else {
            alert("Failed to save recruiter data");
        }
    } catch (error) {
        console.error("Error during profile update:", error);
        alert("Error updating recruiter profile");
    }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <>
      <RecruiterSideBar />
      <div>
        {photo ? (
          <img src={photo} alt="Profile" className="profile-photo" />
        ) : (
          <p>No Profile Picture</p>
        )}
      </div>
      <div>
        <h2>Recruiter Profile</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", name: "name" },
            { label: "Company", name: "company" },
            { label: "Email", name: "email" },
            { label: "Contact Number", name: "contactNumber" },
            { label: "Industry", name: "industry" },
            { label: "Location", name: "location" },
            { label: "Website URL", name: "websiteurl" },
            { label: "Username", name: "username" },
            { label: "Password", name: "password" },
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}:</label>
              {isEditing ? (
                <input
                  type={field.name === "password" ? "password" : "text"}
                  id={field.name}
                  name={field.name}
                  value={recruiter[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <span>{recruiter[field.name]}</span>
              )}
            </div>
          ))}

          {isEditing && (
            <div>
              <label htmlFor="photo">Profile Picture:</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          )}

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          {isEditing && (
            <>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default RecruiterProfile;
