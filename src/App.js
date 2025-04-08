import React, { useState } from 'react';
import {useEffect, useRef} from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import MapViewer from './components/MapViewer';
import Sidebar from './components/Sidebar';
import AnnotationTools from './components/AnnotationTools';
import './styles.css';

// Maps data
const mapsData = [
  { id: 1, 
    name: 'Bank' , 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ilgtuzucX7hEu2MvjhRtp/0bb6e106d78625ea218a572fbb7a5157/r6-maps-bank.jpg',
    floors: [
      {name: 'Basement', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1DQ8HzVXAIpl5Flv1BNURw/c312cb87861b6c936510bc751ba9683b/r6-maps-bank-blueprint-3.jpg'},
      {name: 'Ground', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ZcnTtEXcYt8CrMsjbCvSu/df6694e263225814bb6ac8a0787d90d5/r6-maps-bank-blueprint-1.jpg'},
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ITkJP9lxHjVKzS9Ubcwtv/5e3948920858f8a624cffa56fc7514df/r6-maps-bank-blueprint-2.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3iRfs8bs7ZDzQLiXtWH5sk/faffda675d754e148bb0ab2c249239ae/r6-maps-bank-blueprint-4.jpg'}
    ]},
  
  { id: 2, name: 'Border' , thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4hqsrL3cokFqedkfjiEaGf/c73f6714b535263a18e4de2ca2405dd1/r6-maps-border__1_.jpg'},
  
  { id: 3, name: 'Clubhouse', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1vCw5eD2XzxZlv6Au1gtui/baeebaa75cd672e0af8f9f624cf61bde/r6-maps-clubhouse.jpg' },
  
  { id: 4, name: 'Consulate', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6PR2sBla9E6TNurVUfJ0mc/9a58f08dca1c465787e5a1b6cf6a136b/CONSULATE_REWORK_PREVIEW_03_960x540.jpg' },
  
  { id: 5, name: 'Coastline', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5GfAQ3pXCJnDqiqaDH3Zic/db1722cd699bb864ee8f7b0db951b0c3/r6-maps-coastline.jpg' },
  
  { id: 6, name: 'Kafe Dostoyevsky', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg' },
  
  { id: 7, name: 'Oregon', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Z9a0gU7iR0vfcbXtoJUOW/42ad6aabbd189fbcd74c497627f1624e/r6-maps-oregon.jpg'},
  
  { id: 8, name: 'Skyscraper', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7vblsbhmSPLsI3pQJ5Dqx9/f213af09981f5c8ec9b71fb0c3f9dcdd/r6-maps-skyscraper.jpg' },
  
  { id: 9, name: 'Villa', thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Io6dxNeHbCbJoF9WLJf9s/ebf89b009affba37df84dcf1934c74e0/r6-maps-villa.jpg' },
];

// Function to handle map selection (just logs for now)
const setSelectedMap = (map) => {
  console.log('Selected Map:', map);
};

const setSelectedFloor = (floor) => {
  console.log('Selected Floor:', floor);
};
const App = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTool, setCurrentTool] = useState(null);
  const [toolLayout, setToolLayout] = useState('horizontal'); // 'horizontal' or 'vertical'
  const [showSettings, setShowSettings] = useState(false);
  const canvasRef = useRef(null);



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let startX = 0, startY = 0;
  
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
  
    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
  
    const startDrawing = (e) => {
      const pos = getMousePos(e);
      startX = pos.x;
      startY = pos.y;
      drawing = true;
  
      if (currentTool === 'text') {
        const text = prompt('Enter text:');
        if (text) {
          ctx.fillStyle = 'red';
          ctx.font = '20px Arial';
          ctx.fillText(text, startX, startY);
        }
        drawing = false;
      } else if (currentTool === 'eraser') {
        ctx.clearRect(startX, startY, 10, 10);
      } else if (currentTool === 'pen') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
      }
    };
  
    const draw = (e) => {
      if (!drawing) return;
      const pos = getMousePos(e);
  
      if (currentTool === 'pen') {
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (currentTool === 'eraser') {
        ctx.clearRect(pos.x, pos.y, 10, 10);
      }
    };
  
    const stopDrawing = (e) => {
      if (!drawing) return;
      const pos = getMousePos(e);
  
      if (currentTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (currentTool === 'shape') {
        const width = pos.x - startX;
        const height = pos.y - startY;
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, width, height);
      }
  
      drawing = false;
      ctx.closePath();
    };
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    window.addEventListener('resize', resizeCanvas);
  
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentTool, selectedMap]);

  const renderToolButtons = () => (
    <>
      <ToolButton label="Pen" icon="fas fa-pencil-alt" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Shape" icon="fas fa-square" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Text" icon="fas fa-font" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Eraser" icon="fas fa-eraser" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Line" icon="fas fa-random" current={currentTool} setCurrent={setCurrentTool} />
      <div
        className={`p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 ${
          currentTool === 'Clear' ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onClick={() => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }}
      >
        <p className="font-semibold">Clear</p>
        <i className="fas fa-trash-alt text-2xl"></i>
      </div>
    </>
  );

  const ToolButton = ({ label, icon, current, setCurrent }) => (
    <div
      className={`p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 ${
        current === label.toLowerCase() ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      onClick={() => setCurrent(label.toLowerCase())}
    >
      <p className="font-semibold">{label} Tool</p>
      <i className={`${icon} text-2xl`}></i>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center h-16">
        <div className="text-lg font-semibold">Rainbow Six Siege Map Annotations</div>
        <div className="flex space-x-4">
          <button className="bg-gray-600 px-4 py-2 rounded">User Account</button>
          <div className="relative">
            <button
              className="bg-gray-600 px-4 py-2 rounded"
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-4 z-10 w-48">
                <label className="block mb-2 font-semibold">Tool Layout</label>
                <select
                  className="w-full p-2 border rounded"
                  value={toolLayout}
                  onChange={(e) => setToolLayout(e.target.value)}
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Vertical Menu) */}
        <div className={`bg-gray-800 text-white w-64 p-6 space-y-6 ${isSidebarOpen ? '' : 'hidden'} flex flex-col overflow-y-auto`}>
          {/* Maps Title */}
          <div className="text-2xl font-semibold text-center">Maps</div>

          {/* List of Maps */}
          <div className="space-y-2 mt-4 max-h-screen overflow-y-auto scroll-smooth">
            {mapsData.map((map) => (
              <button
                key={map.id}
                className="bg-gray-500 text-white py-2 px-4 rounded w-full text-left hover:bg-gray-400"
                onClick={() => setSelectedMap(map)}
              >
                {map.thumbnail && (
                  <img 
                    src={map.thumbnail} 
                    alt={'$map.name} thumbnail'} 
                    className="w-full h-full object-cover transition duration-200 group-hover:brightness-90 rounded mb-2" 
                  />
                )}
                <span>{map.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white p-4 flex flex-col overflow-hidden">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to R6 Siege Map Annotations</h1>
          <p className="text-lg text-gray-600">This is your starting page. Select a map, choose a floor, and start annotating!</p>
          
          <div className={`flex ${toolLayout === 'vertical' ? 'flex-row' : 'flex-col'} gap-6 flex-1 overflow-hidden`}>
            {/* Vertical Tools on Left (if vertical layout) */}
            {toolLayout === 'vertical' && (
              <div className="flex flex-col gap-2 w-28 shrink-0">
                {renderToolButtons()}
              </div>
            )}

          {/* Map Viewer */}
          <div className="relative bg-gray-200 flex-1 flex justify-center items-center rounded overflow-hidden">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {selectedMap?.floors.map((floor) => (
                  <button
                    key={floor.name}
                    className={`px-3 py-1 rounded font-semibold ${
                      selectedFloor?.name === floor.name
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => setSelectedFloor(floor)}
                  >
                    {floor.name}
                  </button>
                ))}
              </div>

              {selectedFloor?.image || selectedMap?.thumbnail ? (
                <>
                  <img
                    src={selectedFloor?.image || selectedMap.thumbnail}
                    alt={`${selectedMap.name} - ${selectedFloor?.name || "Overview"}`}
                    className="w-full h-full object-contain scale-98 pointer-events-none"
                  />
                    <canvas
                      ref={canvasRef}
                      id="drawing-canvas"
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-xl text-gray-500">
                    Select a map to view it here.
                    </div>
                )}
              </div>

              {toolLayout === 'horizontal' && (
                <div className="flex flex-wrap justify-start gap-2">
                  {renderToolButtons()}
                </div>
              )}
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
