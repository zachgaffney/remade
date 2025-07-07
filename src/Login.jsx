import { useState } from 'react';
import { useUser } from './UserContext.jsx';
import './Login.css';

function Login() {
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();

  const handleLogin = () => {
    if (password === 'KingZachy1') {
      setUser(firstName);
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
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
    </div>
  );
}

export default Login;