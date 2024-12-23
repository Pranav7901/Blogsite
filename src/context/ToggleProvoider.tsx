"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';


// Define the context type
interface ToggleContextType {
  mode: string;
  toggle: () => void;
}

// Create the context with an initial value of undefined
const AppContext = createContext<ToggleContextType | undefined>(undefined);

// Create the provider component
export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider value={{ mode, toggle }}>
        <div className={`theme ${mode}`}>{children}</div>
      
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useToggle = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};