import React from 'react';
import Header from './Header';

function Home() {
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            textAlign: 'center',
            padding: '20px',
            backgroundImage: 'url("/src/images/home1.jpg")', // Add the background image URL here
            backgroundSize: 'cover', // Ensures the image covers the entire screen
            backgroundPosition: 'center', // Centers the image
            minHeight: '100vh', // Ensures the container takes full viewport height
            width:'100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        welcomeCard: {
            padding: '40px',
            margin: '30px auto',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '70%',
            textAlign: 'center',
        },
        title: {
            fontSize: '2rem',
            marginBottom: '10px',
        },
        tagline: {
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '20px',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '20px',
            margin: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'left',
            width: '500px',
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: '10px',
        },
        cardImage: {
            width: '100%',
            borderRadius: '6px',
        },
        cardTitle: {
            fontSize: '1.5rem',
            margin: '10px 0',
        },
        footer: {
            width: '100%',
            padding: '20px',
            backgroundColor: '#343a40', // Matching footer color with header
            color: '#ffffff',
            textAlign: 'center',
            position: 'fixed',
            bottom: '0',
            left: '0',
            boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
        },
    };

    return (
        // <div style={styles.container}>
        <div style={styles.container}>
            <Header />
            <div style={styles.welcomeCard}>
                <h1 style={styles.title}>Welcome to the Placement Portal</h1>
                <p style={styles.tagline}>Connecting You to Your Dream Career</p>
            </div>
            <div>
                <p><strong>CareerConnect</strong> is dedicated to helping individuals build a successful career by offering personalized services tailored to your needs.</p>
                <p><strong>CareerConnect</strong> connects job seekers with top companies, providing them with essential resources like resume building, interview preparation, and career counseling.</p>
            </div>

            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={styles.card}>
                        <img
                            src="src/images/resumebuilding.jpg" // Replace with the actual image path
                            alt="Resume Building"
                            style={styles.cardImage}
                        />
                        <h3 style={styles.cardTitle}>Resume Building</h3>
                    </div>
                    <div style={styles.card}>
                        <img
                            src="src/images/interview.jpg" // Replace with the actual image path
                            alt="Interview Preparation"
                            style={styles.cardImage}
                        />
                        <h3 style={styles.cardTitle}>Interview Preparation</h3>
                    </div>
                    <div style={styles.card}>
                        <img
                            src="src/images/careercounselling.jpg" // Replace with the actual image path
                            alt="Career Counseling"
                            style={styles.cardImage}
                        />
                        <h3 style={styles.cardTitle}>Career Counseling</h3>
                    </div>
                    <div style={styles.card}>
                        <img
                            src="src/images/skill.jpg" // Replace with the actual image path
                            alt="Skill Development"
                            style={styles.cardImage}
                        />
                        <h3 style={styles.cardTitle}>Skill Development</h3>
                    </div>
                    <div style={styles.card}>
                        <img
                            src="src/images/ad.jpg" // Replace with the actual image path
                            alt="Job Placement Assistance"
                            style={styles.cardImage}
                        />
                        <h3 style={styles.cardTitle}>Job Placement Assistance</h3>
                    </div>
                </div>
            </div>
            
            <footer style={styles.footer}>
                <p>&copy; 2024 CareerConnect. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
