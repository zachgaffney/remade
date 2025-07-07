import { useUser } from './UserContext.jsx';
import Login from './Login.jsx';
import HomePage from './HomePage.jsx';

function App() {
  const { user, setUser } = useUser();

  if (!user) {
    return <Login />;
  }

  return (
    <HomePage />
  );
}

export default App;
