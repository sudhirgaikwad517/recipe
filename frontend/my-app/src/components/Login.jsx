import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css'; // Import the Auth CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoginSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });

      // Store the token (in local storage for now - consider more secure methods for production)
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect or update state to indicate successful login
      setIsLoggedIn(true);
      setLoginSuccessMessage('Login successful!');

      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
      // You can also use react router instead of window.location.href
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Incorrect Details');
      } else {
        setError(err.response?.data?.message || 'Login failed');
      }
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLoggedIn ? (
          <p>{loginSuccessMessage}</p>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
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
              <button type="submit">Login</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
