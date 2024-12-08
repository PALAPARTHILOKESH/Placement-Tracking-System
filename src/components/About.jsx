import React from 'react';
import Header from './Header';

function About() {
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            textAlign: 'center',
            padding: '200px',
            backgroundImage: 'url("/src/images/contact.jpg")', // Add the background image URL here
            backgroundSize: 'cover', // Ensures the image covers the entire screen
            backgroundPosition: 'center',
            minHeight: '100vh', // Ensures the container takes full viewport height
            width:'100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        title: {
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#fff', // White text for contrast with the background image
        },
        cardsContainer: {
            display: 'flex',
            // justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginTop: '30px',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
            textAlign: 'center',
            marginBottom: '20px',
        },
        cardImage: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '15px',
            objectFit: 'cover',
        },
        cardTitle: {
            fontSize: '1.5rem',
            marginBottom: '10px',
            color: '#333',
        },
        cardDescription: {
            fontSize: '1rem',
            color: '#666',
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
        <div style={styles.container}>
            <Header />
            <h1 style={{ ...styles.title, color: 'black' }}>Meet Our Admin Team</h1>

            <div style={styles.cardsContainer}>
                <div style={styles.card}>
                    <img
                        src="src/images/a3.jpeg" // Replace with the actual image path for admin 1
                        alt="Admin 1"
                        style={styles.cardImage}
                    />
                    <h3 style={styles.cardTitle}>Admin 1</h3>
                    <p style={styles.cardDescription}>Admin 1 is responsible for overseeing system operations and ensuring everything runs smoothly.</p>
                </div>
                <div style={styles.card}>
                    <img
                        src="src/images/a2.jpeg" // Replace with the actual image path for admin 2
                        alt="Admin 2"
                        style={styles.cardImage}
                    />
                    <h3 style={styles.cardTitle}>Admin 2</h3>
                    <p style={styles.cardDescription}>Admin 2 manages user accounts and resolves any issues that arise within the system.</p>
                </div>
                <div style={styles.card}>
                    <img
                        src="src/images/a1.jpeg" // Replace with the actual image path for admin 3
                        alt="Admin 3"
                        style={styles.cardImage}
                    />
                    <h3 style={styles.cardTitle}>Admin 3</h3>
                    <p style={styles.cardDescription}>Admin 3 is in charge of managing data and ensuring everything is up to date.</p>
                </div>
            </div>

            <footer style={styles.footer}>
                <p>&copy; 2024 CareerConnect. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default About;
