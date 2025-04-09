import React, { useState } from 'react';
import {useEffect, useRef} from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import MapViewer from './components/MapViewer';
import Sidebar from './components/Sidebar';
import AnnotationTools from './components/AnnotationTools';
import './styles.css';
import { map } from 'leaflet';

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
  
  { id: 2, 
    name: 'Border' , 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4hqsrL3cokFqedkfjiEaGf/c73f6714b535263a18e4de2ca2405dd1/r6-maps-border__1_.jpg',
    floors: [
      {name: 'Ground', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4nl4T7y1mBfwrti5e8Jq9Q/78fc6dbba89cdcc5a10a8e90889e870b/r6-maps-border-blueprint-1.jpg'},
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1lG2AxuPadRvfN8Vjx7jGV/200afc5ce945628b744437a20969b1c5/r6-maps-border-blueprint-2.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7KjYpqMzBlBDHY1Vbwtz55/d87fe5e00d1623434a9499d485d6d196/r6-maps-border-blueprint-3.jpg'}
    ]},
  
  { id: 3, 
    name: 'Clubhouse', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1vCw5eD2XzxZlv6Au1gtui/baeebaa75cd672e0af8f9f624cf61bde/r6-maps-clubhouse.jpg',
    floors: [
      {name: 'Basement', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6Zs2KBoWjSdaC3qssqwB9N/33907dda5e0363659477296c0e9756c5/r6-maps-clubhouse-blueprint-1.jpg'},
      {name: 'Ground', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3taneZwe0lPRHGvXcJZb6Q/a35fd0b00699bbcc7a88bd2c08db96b6/r6-maps-clubhouse-blueprint-2.jpg'},
      {name: 'Second Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4StUcsi07j6h4DPrmgF5rC/bb99e697439b647bb4fd192b29bb588c/r6-maps-clubhouse-blueprint-3.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5tP8wrsOiDBfa7NzkUUCQQ/b5e27ccd5b145ce59f8886b004e32c8e/r6-maps-clubhouse-blueprint-4.jpg'}
    ]},
  
  { id: 4, 
    name: 'Consulate', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6PR2sBla9E6TNurVUfJ0mc/9a58f08dca1c465787e5a1b6cf6a136b/CONSULATE_REWORK_PREVIEW_03_960x540.jpg',
    floors: [
      {name: 'Basement', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/14Ww7AoFdDGhcjgWpLTMdV/77bc68f24869fd75b49a715b67925488/r6-maps-consulate-blueprint-1.jpg'},
      {name: 'Ground', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/v0KtqRwgoNXSvGxjn0MVR/ec1200c055944ceba822a118d3611197/r6-maps-consulate-blueprint-2.jpg'},
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5Tu3Q2DYvBFyqszsrTwawU/cd611afdefa6713e3ec7237fabb58299/r6-maps-consulate-blueprint-3.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7fTsFMVeL4crvNABSGRMxJ/680ea0834826726ef5901a5d200f9c6a/r6-maps-consulate-blueprint-4.jpg'}
  ]},
  
  { id: 5, 
    name: 'Coastline', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5GfAQ3pXCJnDqiqaDH3Zic/db1722cd699bb864ee8f7b0db951b0c3/r6-maps-coastline.jpg',
    floors: [
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4b0lpXOb5Hv6kgJ2BvrjP9/59b1ccd49d36b8b38621d39d8f9479f9/r6-maps-coastline-blueprint-1.jpg'},
      {name: 'Second Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5juDHwzsSzib8ljx1IzhUa/47430644b7f65c72df9f26a340bead84/r6-maps-coastline-blueprint-2.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2F2dvGQqZQk0AzfTN4VbT5/7fbb95687a759f3bd9e0ece51d667e8e/r6-maps-coastline-blueprint-3.jpg'}
    ]},
  
  { id: 6, 
    name: 'Kafe Dostoyevsky', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2nIuPSHvbM57TK90VSwBEm/70144ada56cf1ba72103aeb4ece9ed1a/r6-maps-kafe.jpg',
    floors: [
      {name: 'Basement', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3WeSCQnTruB4nJ0n9xm7U7/cec112a997dd78b46515b6242d25a379/r6-maps-kafe-blueprint-1.jpg'},
      {name: 'Ground', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7njwDjC8jAG7g2krGRKsYb/2c4216a5f3baee22074759ba1dd45e55/r6-maps-kafe-blueprint-2.jpg'},
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/15f2nyYsxok1GMsuFCrOTW/9036cb95e0f3e048b93aed8f4c13483a/r6-maps-kafe-blueprint-3.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3DdjeKrUij0wzjVlF4FML3/6d74c067b57490ccdc7dc7b180618811/r6-maps-kafe-blueprint-4.jpg'}
    ]},
  
  { id: 7, 
    name: 'Oregon', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Z9a0gU7iR0vfcbXtoJUOW/42ad6aabbd189fbcd74c497627f1624e/r6-maps-oregon.jpg',
    floors: [
      {name: 'Basement', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/qxSuuyTFOj9GcclwEl77K/49277f2343c81f14825415a3cb4e0f96/r6-maps-oregon-blueprint-1.jpg'},
      {name: 'Ground', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6KfdmrotDdUSi3shCZn6O4/2316ad1fb161254f7fb38b2e6c906e64/r6-maps-oregon-blueprint-2.jpg'},
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/K3su6xloMRGuZPQw0yIVD/000e6deabe35780e68d356690d4625a6/r6-maps-oregon-blueprint-3.jpg'},
      {name: 'Second Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3eC0jrji8bJSrukCV8Th4j/ea96c1108b4575eabc16361a67826c6b/r6-maps-oregon-blueprint-4.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4eUlLOqpfR70gM7miuIIuT/082b5df86be7b17b2931b4c4e6fbe0bb/r6-maps-oregon-blueprint-5.jpg'}
    ]},
  
  { id: 8, 
    name: 'Skyscraper', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7vblsbhmSPLsI3pQJ5Dqx9/f213af09981f5c8ec9b71fb0c3f9dcdd/r6-maps-skyscraper.jpg',
    floors: [
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3c0AWlxZek6YUUNTaNfyO6/6b22cb6614a28bf9c13641b234cfd7ed/r6-maps-skyscraper-blueprint-1.jpg'},
      {name: 'Second Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1l0EjB5o3s3HewE1VqmRlu/20fc25c788e0be7519a3cdba8ff5a433/r6-maps-skyscraper-blueprint-2.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6gdx6cZMOzGaVLn5T4tSzv/7099853a4831478ba36d1444fb358c8a/r6-maps-skyscraper-blueprint-3.jpg'}
    ]},
  
  { id: 9, 
    name: 'Villa', 
    thumbnail: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Io6dxNeHbCbJoF9WLJf9s/ebf89b009affba37df84dcf1934c74e0/r6-maps-villa.jpg',
    floors: [
      {name: 'Basement', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1CDFxayW2mJLAJy1I9KlvY/cc04fefb6181fea17cd7ae4a8e460f1b/r6-maps-villa-blueprint-1.jpg'},
      {name: 'First Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3J49jyCJZ6nhs8NaPDxolQ/8831f7742e9f3f1e3350fd4691465275/r6-maps-villa-blueprint-3.jpg'},
      {name: 'Second Floor', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/DgTowUc6zjVXVDa2pKLX1/a820faf2af99b971a19ab799115b28f1/r6-maps-villa-blueprint-4.jpg'},
      {name: 'Roof', image: 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2ZnV8AUq0FtZ8T3XxaYGwK/038468ed870ffc0075f6ade04808d7d2/r6-maps-villa-blueprint-5.jpg'},
    ]},
];

const App = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTool, setCurrentTool] = useState(null);
  const [toolLayout, setToolLayout] = useState('horizontal'); // 'horizontal' or 'vertical'
  const [showSettings, setShowSettings] = useState(false);
  const canvasRef = useRef(null);

  const handleMapSelect = (map) => {
    setSelectedMap(map);
    setSelectedFloor(null); // Reset floor selection when a new map is selected
  };

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
  
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Handle both mouse and touch events
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };
  
    const startDrawing = (e) => {
      e.preventDefault(); // Prevent scrolling on touch devices
      const pos = getPos(e);
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
        ctx.clearRect(startX, startY, 20, 20); // Larger eraser for touch
      } else if (currentTool === 'pen') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
      }
    };
  
    const draw = (e) => {
      if (!drawing) return;
      e.preventDefault(); // Prevent scrolling
      const pos = getPos(e);
  
      if (currentTool === 'pen') {
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3; // Slightly thicker for mobile
        ctx.stroke();
      } else if (currentTool === 'eraser') {
        ctx.clearRect(pos.x - 10, pos.y - 10, 20, 20);
      }
    };
  
    const stopDrawing = (e) => {
      if (!drawing) return;
      const pos = getPos(e);
  
      if (currentTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (currentTool === 'shape') {
        const width = pos.x - startX;
        const height = pos.y - startY;
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 3;
        ctx.strokeRect(startX, startY, width, height);
      }
  
      drawing = false;
      ctx.closePath();
    };
  
    // Add touch events alongside mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    window.addEventListener('resize', resizeCanvas);
  
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
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
      className={`p-2 sm:p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 
        ${current === label.toLowerCase() ? 'bg-blue-500' : 'bg-gray-300'}
        min-w-[60px] sm:min-w-[80px]`}
      onClick={() => setCurrent(label.toLowerCase())}
    >
      <i className={`${icon} text-xl sm:text-2xl`}></i>
      <p className="font-semibold text-xs sm:text-sm mt-1">{label}</p>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16">
        <div className="text-lg font-semibold text-center w-full sm:w-auto mb-2 sm:mb-0">
          Rainbow Six Siege Map Annotations
        </div>
        <div className="flex space-x-2 sm:space-x-4">
          <button className="bg-gray-600 px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">
            User Account
          </button>
          <div className="relative">
            <button
              className="bg-gray-600 px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base"
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
        <div className={`bg-gray-800 text-white w-full sm:w-64 p-3 sm:p-6 space-y-3 sm:space-y-6 
          ${isSidebarOpen ? 'absolute z-50 sm:relative' : 'hidden'} 
          flex flex-col overflow-y-auto h-screen sm:h-auto`}>
          {/* Add this close button at the top */}
          <button 
            className="sm:hidden absolute right-4 top-4 text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          {/* Maps Title */}
          <div className="text-2xl font-semibold text-center">Maps</div>

          {/* List of Maps */}
          <div className="space-y-2 mt-4 max-h-screen overflow-y-auto scroll-smooth">
            {mapsData.map((map) => (
              <button
                key={map.id}
                className="bg-gray-500 text-white py-2 px-4 rounded w-full text-left hover:bg-gray-400"
                onClick={() => handleMapSelect(map)}
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

              {selectedMap ?(
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
                <div className={`flex ${toolLayout === 'vertical' ? 'flex-col' : 'flex-wrap'} gap-2 
                ${toolLayout === 'vertical' ? 'w-20 sm:w-28' : 'w-full'} shrink-0`}>
                {renderToolButtons()}
              </div>
              )}
        </div>
      </div>
    </div>
    <button 
      className="sm:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
      onClick={() => setIsSidebarOpen(true)}
    >
      <i className="fas fa-bars text-xl"></i>
    </button>
  </div>
  );
};

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
