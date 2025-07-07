import { useUser } from './UserContext.jsx';

function HomePage() {
  const { user } = useUser();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, {user}!</h1>
    </div>
  );
}

export default HomePage;
