import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        if (!username || !password) {
            toast.error('Please fill in both fields');
            return;
        }
        const userdata = { username, password };
        try {
            const response = await axios.get(`http://localhost:5000/login`, { params: userdata });
            if (response.data) {
                let {id,role} = response.data;
                localStorage.setItem('id',id)
                localStorage.setItem('username',userdata.username)
                localStorage.setItem('password',userdata.password)

                sessionStorage.setItem('id',id)
                sessionStorage.setItem('username',username)
                sessionStorage.setItem('role',role)
                if (role === 'student') {
                    toast.success('Login successful');
                    setTimeout(() => {
                        navigate('/studenthome');
                    }, 1000);
                } else if (role === 'admin') {
                    toast.success('Login successful');
                    setTimeout(() => {
                        navigate('/adminhome');
                    }, 1000);   
                } else if(role === 'recruiter')
                    {
                        let {id,role,company} = response.data;
                    localStorage.setItem('company',company)
                    toast.success('Login successful');
                    setTimeout(() => {
                        navigate('/recruiterhome');
                    }, 1000);  
                    }
                else{
                    toast.error('Invalid Credentials');
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    toast.error('Unauthorized: Invalid username or password');
                }
            } else {
                toast.error('Unable to connect to the server. Please try again later.');
            }
        }
    };


    return (
        <>
            <Header />
            <ToastContainer />
            <div id="login-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"><h1><b>Enter Username</b></h1></label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <label htmlFor="password"><h1><b>Enter Password</b></h1></label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button type="submit"><h1><b>Submit</b></h1></button>
                </form>
            </div>
            <footer>
                <p>&copy; 2024 CareerConnect. All Rights Reserved.</p>
            </footer>
        </>
    );
}

export default Login;