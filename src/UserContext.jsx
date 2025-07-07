import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a custom hook for easy access
export const useUser = () => useContext(UserContext);

// Create the provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
