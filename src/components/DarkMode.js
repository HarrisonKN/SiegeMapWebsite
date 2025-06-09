import React, { createContext, useContext, useEffect, useState } from "react";

const DarkMode = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <DarkMode.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};

export const useDarkMode = () => useContext(DarkMode);