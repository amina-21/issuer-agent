import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || "");
  
    const handleLogin = (username, role) => {
      sessionStorage.setItem("userRole", role);
      setUserRole(role);
    };
  
    const handleLogout = () => {
      sessionStorage.removeItem("userRole");
      setUserRole("");
    };
  
    return (
      <UserContext.Provider value={{ userRole, handleLogin, handleLogout }}>
        {children}
      </UserContext.Provider>
    );
  };

export default UserProvider;
