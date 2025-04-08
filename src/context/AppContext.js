import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  return (
    <AppContext.Provider value={{ selectedMap, setSelectedMap, selectedFloor, setSelectedFloor }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
