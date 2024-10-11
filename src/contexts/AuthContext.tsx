import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/config';
import { User, onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};