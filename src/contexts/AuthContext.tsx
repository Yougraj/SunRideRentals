import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentialResponse: { credential: string }) => void;
  logout: () => void;
  getAvatarUrl: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple MD5 hash function for Gravatar
function md5(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(32, '0');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sunride_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((credentialResponse: { credential: string }) => {
    try {
      // Decode JWT to get user info
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const payload = JSON.parse(jsonPayload);
      
      // Use Google picture or generate Gravatar URL
      const email = payload.email || '';
      const googlePicture = payload.picture;
      const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email.toLowerCase().trim())}?s=200&d=identicon`;
      
      const userData: User = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: googlePicture || gravatarUrl,
      };
      
      setUser(userData);
      localStorage.setItem('sunride_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('sunride_user');
  }, []);

  const getAvatarUrl = useCallback(() => {
    if (!user) return '';
    if (user.picture) return user.picture;
    // Fallback to Gravatar
    return `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase().trim())}?s=200&d=identicon`;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        getAvatarUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
