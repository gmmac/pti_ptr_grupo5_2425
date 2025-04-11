// src/contexts/UserTypeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Cria o contexto
const UserTypeContext = createContext();

// Cria o provider
export function UserTypeProvider({ children }) {
  const [userType, setUserType] = useState(null); // 'client' | 'employee' | 'organizer' | null

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
}

export function useUserType() {
  const context = useContext(UserTypeContext);

  if (!context) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
}
