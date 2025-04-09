import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [zoom, setZoom] = useState(1); 

  return (
    <AppContext.Provider value={{ selectedMap, setSelectedMap, selectedFloor, setSelectedFloor, zoom, setZoom }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
