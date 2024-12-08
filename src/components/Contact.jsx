import React, { useState } from 'react';
import Header from './Header';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                backgroundImage: 'url("/src/images/about.jpg")', // Add your background image here


                
                    
            
                
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                width: '100vw', // Ensure it takes the full viewport height
                margin: '0', // Remove any default margin
            }}
        >
            <Header />
            <h1>Contact Us</h1>
            {submitted ? (
                <div>
                    <h2>Thank you for your message!</h2>
                    <p>We will get back to you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={{ margin: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                    />
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Send Message
                    </button>
                </form>
            )}

            {/* Footer Section */}
            <footer style={{
                width: '100%',
                padding: '20px',
                backgroundColor: '#343a40',
                color: '#ffffff',
                textAlign: 'center',
                position: 'fixed',
                bottom: '0',
                left: '0',
                boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
            }}>
                <p>&copy; 2024 CareerConnect. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Contact;
