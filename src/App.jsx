import { useState } from 'react';
import Login from './Login.jsx';
import HomePage from './HomePage.jsx';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <HomePage user={user} />
  );
}

export default App;
