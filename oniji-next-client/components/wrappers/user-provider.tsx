'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { GET_USER } from '@/lib/gql';
import { useQuery } from '@apollo/client';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (data && data.ONIJI_User.user) {
      setUser({
        id: data.ONIJI_User.user.id,
        firstName: data.ONIJI_User.user.first_name,
        lastName: data.ONIJI_User.user.last_name,
        email: data.ONIJI_User.user.email,
      });
    } else if (error) {
      console.error('Failed to fetch user info:', error);
      setUser(null);
    }
  }, [data, error]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading: loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}