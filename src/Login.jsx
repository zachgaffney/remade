import { useState } from 'react';
import './Login.css'; // optional for styling

function Login({ onLogin }) {
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (password === 'KingZachy1') {
      onLogin(firstName);
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="login-container">
      <img src="/seattle-mariners-logo-black-and-white.png" alt="Logo" className="logo" />
      <input
        type="text"
        placeholder="Enter your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
