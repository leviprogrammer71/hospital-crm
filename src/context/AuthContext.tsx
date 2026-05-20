import React, { createContext, useState, useContext } from 'react';

interface User {
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'pharmacy' | 'receptionist';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: User['role']) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, role: User['role']) => {
    setUser({ email, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
