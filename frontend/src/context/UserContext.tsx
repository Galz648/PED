"use client"
import React, { createContext, useContext } from 'react';

const UserContext = createContext<string | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = '123'; // Replace with actual logic to get user ID
  return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
