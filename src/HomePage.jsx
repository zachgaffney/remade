import { useUser } from './UserContext';
import WeatherWidget from './WeatherWidget';

function HomePage() {
  const { user } = useUser();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          backgroundColor: 'var(--card)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ margin: 0 }}>Welcome, {user}!</h1>
              <img src="/seattle-mariners-logo-black-and-white.png" alt="Logo" className="logo" />

        <WeatherWidget />
      </header>

      {/* Body */}
      <main style={{ padding: '2rem' }}>
      </main>
    </div>
  );
}

export default HomePage;
