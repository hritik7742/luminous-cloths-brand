import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/admin'); // Redirect to admin page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess('Password reset email sent! Please check your inbox.');
      setResetError('');
    } catch (error) {
      setResetError(error.message);
      setResetSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        {!showResetForm ? (
          <>
            <h2 className="login-title">Login to Admin Panel</h2>
            {error && <p className="error">{error}</p>}
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <div className="forgot-password-container">
              <button className="forgot-password-button" onClick={() => setShowResetForm(true)}>
                Forgot Password?
              </button>
            </div>
          </>
        ) : (
          <div className="reset-password-container">
            <h2 className="reset-password-title">Reset Password</h2>
            <form className="reset-password-form" onSubmit={handlePasswordReset}>
              <input
                type="email"
                placeholder="Enter your email to reset password"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit">Reset Password</button>
              {resetError && <p className="error">{resetError}</p>}
              {resetSuccess && <p className="success">{resetSuccess}</p>}
            </form>
            <button className="back-to-login-button" onClick={() => setShowResetForm(false)}>
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
