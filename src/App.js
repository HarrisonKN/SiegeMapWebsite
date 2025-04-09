import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import OperatorSidebar from './components/OperatorSidebar';
import OperatorData from './components/OperatorData';
import mapsData from './components/MapData';

import MapViewer from './components/MapViewer';
import Sidebar from './components/Sidebar';
import AnnotationTools from './components/AnnotationTools';
import './styles.css';


const App = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTool, setCurrentTool] = useState(null);
  const [toolLayout, setToolLayout] = useState('horizontal');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [placedOperators, setPlacedOperators] = useState([]);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  const canvasRef = useRef(null);
  const { zoom, setZoom } = useAppContext();
  const scrollRef = useRef(null);
  const zoomRef = useRef(zoom);
  const lastZoomCenter = useRef(null);

  const handleMapSelect = (map) => {
    setSelectedMap(map);
    setSelectedFloor(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const movingIndex = e.dataTransfer.getData('movingIndex');
    if (movingIndex !== '') {
      setPlacedOperators((prev) => {
        const updated = [...prev];
        updated[movingIndex] = { ...updated[movingIndex], x, y };
        return updated;
      });
      return;
    }
  
    const data = e.dataTransfer.getData('operator');
    if (data) {
      const operator = JSON.parse(data);
      setPlacedOperators((prev) => [...prev, { ...operator, x, y }]);
    }
  };


  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container || !lastZoomCenter.current) return;

    const { x, y } = lastZoomCenter.current;
    const prevZoom = zoomRef.current;
    const scale = zoom / prevZoom;

    container.scrollLeft = x * scale - (x - container.scrollLeft);
    container.scrollTop = y * scale - (y - container.scrollTop);

    lastZoomCenter.current = null;
  }, [zoom]);
  
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !mapSize.width || !mapSize.height) return;
  
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const zoomedWidth = mapSize.width * zoom;
    const zoomedHeight = mapSize.height * zoom;
  
    const scrollX = Math.max((zoomedWidth - containerWidth) / 2, 0);
    const scrollY = Math.max((zoomedHeight - containerHeight) / 2, 0);
  
    requestAnimationFrame(() => {
      container.scrollLeft = scrollX;
      container.scrollTop = scrollY;
    });
  }, [mapSize.width, mapSize.height, zoom, selectedMap]); 

  useEffect(() => {

    const img = new Image();
    img.src = selectedFloor?.image || selectedMap?.thumbnail;
    img.onload = () => { 
      const width = img.width; 
      const height = img.height;
      setMapSize({ width, height });
    };

    const handleKeyDown = (e) => {
      const container = scrollRef.current;
      if (!container) return;
  
      const scrollSpeed = 40; // Change this to make it faster/slower
      switch (e.key) {
        case 'ArrowLeft':
          container.scrollLeft -= scrollSpeed;
          break;
        case 'ArrowRight':
          container.scrollLeft += scrollSpeed;
          break;
        case 'ArrowUp':
          container.scrollTop -= scrollSpeed;
          break;
        case 'ArrowDown':
          container.scrollTop += scrollSpeed;
          break;
      }
    };


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


    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [currentTool, selectedMap, selectedFloor, zoom]);

  const renderToolButtons = () => (
    <>
      <ToolButton label="Pen" icon="fas fa-pencil-alt" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Shape" icon="fas fa-square" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Text" icon="fas fa-font" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Eraser" icon="fas fa-eraser" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton label="Line" icon="fas fa-random" current={currentTool} setCurrent={setCurrentTool} />
      <ToolButton
        label="Clear"
        icon="fas fa-trash-alt"
        current={currentTool}
        setCurrent={setCurrentTool}
        customOnClick={() => {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }}
      />
    </>
  );

  const ToolButton = ({ label, icon, current, setCurrent, customOnClick = null }) => (
    <div
      className={`p-2 sm:p-4 rounded-lg text-center cursor-pointer hover:bg-gray-400 
        ${current === label.toLowerCase() ? 'bg-blue-500' : 'bg-gray-300'}
        min-w-[60px] sm:min-w-[80px]`}
      onClick={() => {
        if (customOnClick) {
          customOnClick();
        } else {
          setCurrent(label.toLowerCase());
        }
      }}
    >
      <i className={`${icon} text-xl sm:text-2xl`}></i>
      <p className="font-semibold text-xs sm:text-sm mt-1">{label}</p>
    </div>
  );

  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  const startPan = (e) => {
    isPanning.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    panStart.current = {
      x: clientX,
      y: clientY,
      scrollLeft: scrollRef.current.scrollLeft,
      scrollTop: scrollRef.current.scrollTop,
    };
  };

  const doPan = (e) => {
    if (!isPanning.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - panStart.current.x;
    const dy = clientY - panStart.current.y;

    scrollRef.current.scrollLeft = panStart.current.scrollLeft - dx;
    scrollRef.current.scrollTop = panStart.current.scrollTop - dy;
  };

  const endPan = () => {
    isPanning.current = false;
  };

  const handleMouseMove = (e) => {
    if (isPanning && scrollRef.current) {
      scrollRef.current.scrollLeft -= e.movementX;
      scrollRef.current.scrollTop -= e.movementY;
    }
  };


  return (
    <div className="flex flex-col h-screen">

      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">R6 Siege Map Annotations</div>

          {/*Top Right Menu Buttons*/}
          <div className="flex space-x-2 sm:space-x-4">
            <button className="bg-gray-600 px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">
              User Account</button>

            <div className="relative">
              <button
                className="bg-gray-600 px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base"
                onClick={() => setShowSettings(!showSettings)}>Settings</button>

              {showSettings && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-4 z-10 w-48">
                  <label className="block mb-2 font-semibold">Tool Layout</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={toolLayout}
                    onChange={(e) => setToolLayout(e.target.value)}>

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
        
        {/* Map Sidebar */}
        <div className={`bg-gray-800 text-white w-full sm:w-64 p-4 overflow-y-auto ${
          isSidebarOpen ? 'absolute z-50 sm:relative' : 'hidden'}`}>

          {/* Mobile Menu Close Button */}
          <button className="sm:hidden absolute right-4 top-4 text-white" onClick={() => setIsSidebarOpen(false)}>
            <i className="fas fa-times text-xl"></i>
          </button>
          
          {/* Maps Title */}
          <div className="text-2xl font-semibold text-center">Maps</div>

          {/* List of Maps */}
          <div className="space-y-2 mt-4">
            {mapsData.map((map) => (
              <button
                key={map.id}
                className="bg-gray-500 text-white py-2 px-4 rounded w-full text-left hover:bg-gray-400"
                onClick={() => handleMapSelect(map)}
              >
                {map.thumbnail && (
                  <img 
                    src={map.thumbnail} 
                    alt={`$map.name} thumbnail`} 
                    className="w-full h-full object-contain rounded mb-2"
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
          <p className="text-lg text-gray-600">Select a map, choose a floor, and start annotating!</p>

          {/* Floor selection buttons */}
          {selectedMap && (
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 bg-white/80 p-2 rounded shadow fixed">
                          {selectedMap.floors.map((floor) => (
                            <button
                              key={floor.name}
                              className={`px-3 py-1 rounded font-semibold ${
                                selectedFloor?.name === floor.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                              onClick={() => setSelectedFloor(floor)}>
                              {floor.name}
                            </button>
                          ))}
                        </div>
                    )}

          <div className={`flex ${toolLayout === 'vertical' ? 'flex-row' : 'flex-col'} gap-6 flex-1 overflow-hidden`}>
            {toolLayout === 'vertical' && <div className="flex flex-col gap-2 w-28 shrink-0">{renderToolButtons()}</div>}
          

            {/* Map Viewer */}
            <div className="relative bg-gray-200 flex-1 flex justify-center items-center rounded overflow-hidden">
              <div className="w-full h-full overflow-auto relative cursor-grab active:cursor-grabbing"
                  ref={scrollRef}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: '100%',
                    minWidth: '100%'
                  }}
                  onWheel={(e) => {
                    e.preventDefault();
                    const container = scrollRef.current;
                    if (!container) return;

                    const rect = container.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    const scrollLeft = container.scrollLeft;
                    const scrollTop = container.scrollTop;

                    const zoomCenterX = scrollLeft + mouseX;
                    const zoomCenterY = scrollTop + mouseY;

                    const oldZoom = zoomRef.current;
                    const newZoom = e.deltaY < 0 ? Math.min(zoom + 0.1, 3) : Math.max(zoom - 0.1, 0.5);

                    lastZoomCenter.current = { x: zoomCenterX, y: zoomCenterY };
                    zoomRef.current = newZoom;
                    setZoom(newZoom);
                  }}>
                  <div className="relative flex-1 h-full flex justify-center items-center">
                    { /*Scrollable Area*/}
                    <div
                      className="w-full h-full overflow-auto relative cursor-grab active:cursor-grabbing"
                      ref={scrollRef}>
                      {selectedMap ? (
                        <div
                          style={{
                            transform: `scale(${zoom})`,
                            transition: 'transform 0.1s ease-out',
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                          {/* Map Image */}
                          <img
                            src={selectedFloor?.image || selectedMap.thumbnail}
                            alt={`${selectedMap.name} - ${selectedFloor?.name || 'Overview'}`}
                            className="absolute w-full h-full pointer-events-none object-contain"
                            style={{
                              width: `100%`,
                              height: `100%`
                            }}
                          />

                          {/* Placed Operators */}
                          {placedOperators.map((op, index) => (
                            <img
                              key={index}
                              src={op.image}
                              alt={op.name}
                              title={op.name}
                              className="absolute w-10 h-10 rounded-full border-2 border-white cursor-move z-20"
                              style={{
                                top: `${op.y}px`,
                                left: `${op.x}px`,
                                transform: `scale(${1 / zoom})`,
                              }}
                              draggable
                              onDragStart={(e) => e.dataTransfer.setData('movingIndex', index)}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                setPlacedOperators((prev) => prev.filter((_, i) => i !== index));
                              }}
                            />
                          ))}

                          {/* Annotation Canvas */}
                          <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full"
                            width={mapSize.width}
                            height={mapSize.height}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-xl text-gray-500">
                          Select a map to view it here.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>

            {toolLayout === 'horizontal' && (
              <div className="flex flex-wrap gap-2 w-full">
                {renderToolButtons()}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => setZoom(prev => Math.min(prev + 0.1, 3))}>Zoom In</button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}>Zoom Out</button>
                <p className="text-sm text-gray-700 mt-1">Zoom: {Math.round(zoom * 100)}%</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Operator Sidebar */}
        <div className="bg-gray-800 text-white w-full sm:w-64 p-4 overflow-y-auto">
          <OperatorSidebar
            operators={OperatorData}
            onOperatorSelect={setSelectedOperator}
            onClearOperators={() => setPlacedOperators([])}
          />
        </div>
      </div>

      <button 
        className="sm:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsSidebarOpen(true)}>
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



// Notes:
// Pen Tool drawing gets removed when zooming

// positioning of things gets weird when zooming
//need to maintain position of operators and drawings
//when zooming and also need to make the pen tool
// work where the mouse/input is rather than where it
// is in space, when zoomed the drawing is not in the right place

//could move position of floor buttons

// need to add gadgets and things menu 