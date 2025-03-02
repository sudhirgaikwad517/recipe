import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css'; // Import the Auth CSS

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false); // Track signup success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await axios.post('http://localhost:4000/api/register', {
        username,
        password,
      });

      console.log('Signup successful!');
      setIsSignupSuccessful(true); // Update state on successful signup
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isSignupSuccessful ? (
          <p>Signup successful!</p> // Display success message
        ) : (
          <>
            <h2>Signup</h2>
            {error && <p className="error">{error}</p>} {/* Add the error class */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Signup</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
