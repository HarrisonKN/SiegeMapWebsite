import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import MapViewer from './components/MapViewer';
import Sidebar from './components/Sidebar';
import AnnotationTools from './components/AnnotationTools';
import './styles.css';

// Maps data
const mapsData = [
  { id: 1, name: 'Bank' },
  { id: 2, name: 'Border' },
  { id: 3, name: 'Clubhouse' },
  { id: 4, name: 'Consulate' },
  { id: 5, name: 'Coastline' },
  { id: 6, name: 'Kafe Dostoyevsky' },
  { id: 7, name: 'Oregon' },
  { id: 8, name: 'Skyscraper' },
  { id: 9, name: 'Villa' },
];

// Function to handle map selection (just logs for now)
const setSelectedMap = (map) => {
  console.log('Selected Map:', map);
};

const setSelectedFloor = (floor) => {
  console.log('Selected Floor:', floor);
};

const App = () => {
  const { selectedMap, selectedFloor } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">Rainbow Six Siege Map Annotations</div>
        <div className="flex space-x-4">
          <button className="bg-gray-600 px-4 py-2 rounded">User Account</button>
          <button className="bg-gray-600 px-4 py-2 rounded">Settings</button>
        </div>
      </div>

      {/* Main Body Layout */}
      <div className="flex flex-1">
        {/* Sidebar (Vertical Menu) */}
        <div className={`bg-gray-800 text-white w-64 p-6 space-y-6 ${isSidebarOpen ? '' : 'hidden'}`}>
          {/* Maps Title */}
          <div className="text-2xl font-semibold text-center">Maps</div>

          {/* List of Maps */}
          <div className="space-y-2 mt-4">
            {mapsData.map((map) => (
              <button
                key={map.id}
                className="bg-gray-500 text-white py-2 px-4 rounded w-full text-left hover:bg-gray-400"
                onClick={() => setSelectedMap(map)}
              >
                {map.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to R6 Siege Map Annotations</h1>
          <p className="text-lg text-gray-600">This is your starting page. Select a map, choose a floor, and start annotating!</p>

          {/* Annotation Tools Section */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Toolboxes for different annotation tools */}
            <div className="bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400">
              <p className="font-semibold">Pen Tool</p>
              <i className="fas fa-pencil-alt text-2xl"></i>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400">
              <p className="font-semibold">Shape Tool</p>
              <i className="fas fa-square text-2xl"></i>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400">
              <p className="font-semibold">Text Tool</p>
              <i className="fas fa-font text-2xl"></i>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400">
              <p className="font-semibold">Eraser Tool</p>
              <i className="fas fa-eraser text-2xl"></i>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400">
              <p className="font-semibold">Line Tool</p>
              <i className="fas fa-random text-2xl"></i>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400">
              <p className="font-semibold">Clear All</p>
              <i className="fas fa-trash-alt text-2xl"></i>
            </div>
          </div>

          {/* Map Viewer */}
          <div className="bg-gray-200 h-96 flex justify-center items-center">
            <p className="text-xl text-gray-500">Map Display/Annotation Area</p>
          </div>

          <div className="bg-gray-100 p-4 text-center">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full">
              Start Annotating
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
