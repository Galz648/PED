"use client"
import { createContext, useContext } from 'react';

export const UserContext = createContext<string | null>(null);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   // const userId = '123'; // TODO: Replace with actual logic to get user ID
//   return <UserContext.Provider value="123">{children}</UserContext.Provider>;
// };

export const useUser = () => {
  const context = useContext(UserContext);
  console.log(context);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
