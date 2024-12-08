import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentHeader from './StudentHeader';
import '../../styles/studentprofile.css';

const StudentProfile = () => {
  const [photo, setPhoto] = useState("");
  const [student, setStudent] = useState({
    id: '',
    name: '',
    cgpa: '',
    phoneNumber: '',
    program: '',
    email: '',
    department: '',
    graduationYear: '',
    username: '',
    password: '',
    photo: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Session validation
    const studentId = sessionStorage.getItem('id');
    const role = sessionStorage.getItem('role');

    if (!studentId || role !== 'student') {
      navigate('/login');
    } else {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/student/viewbyid/${studentId}`);
          const imageBase64 = response.data.photo
            ? `data:image/jpeg;base64,${response.data.photo}`
            : '';
          setPhoto(imageBase64);
          setStudent(response.data);
        } catch (error) {
          setError('Error fetching student data');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setStudent((prevState) => ({
      ...prevState,
      photo: file,
    }));

    // Create a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result); // Set the preview image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('student', JSON.stringify({
      id: student.id,
      name: student.name,
      cgpa: student.cgpa,
      phoneNumber: student.phoneNumber,
      program: student.program,
      email: student.email,
      department: student.department,
      graduationYear: student.graduationYear,
      username: student.username,
      password: student.password,
    }));

    if (student.photo) {
      formData.append('photo', student.photo); // Append the new photo
    }

    try {
      const response = await axios.post('http://localhost:5000/student/updatestudent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        setIsEditing(false);
      } else {
        alert('Failed to save profile');
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      alert('Error updating the profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <>
      <div>
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="profile-photo"
          />
        ) : (
          <p>No Profile Picture</p>
        )}
      </div>
      <StudentHeader />
      <div>
        <h2>Student Profile</h2>
        <form onSubmit={handleSubmit}>
          {[ 
            { label: 'Name', name: 'name' },
            { label: 'CGPA', name: 'cgpa' },
            { label: 'Phone Number', name: 'phoneNumber' },
            { label: 'Program', name: 'program' },
            { label: 'Email', name: 'email' },
            { label: 'Department', name: 'department' },
            { label: 'Graduation Year', name: 'graduationYear' },
            { label: 'Username', name: 'username' },
            { label: 'Password', name: 'password' }
          ].map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}:</label>
              {isEditing ? (
                <input
                  type={field.name === 'password' ? 'password' : 'text'}
                  id={field.name}
                  name={field.name}
                  value={student[field.name]}
                  onChange={handleChange}
                />
              ) : (
                <span>{student[field.name]}</span>
              )}
            </div>
          ))}

          {isEditing && (
            <div>
              <label htmlFor="photo">Profile Picture:</label>
              <input 
                type="file" 
                id="photo" 
                name="photo" 
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

export default StudentProfile;
