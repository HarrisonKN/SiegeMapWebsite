import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import OperatorSidebar from './components/OperatorSidebar';
import OperatorData from './components/OperatorData';
import mapsData from './components/MapData';

import MapViewer from './components/MapViewer';
import Sidebar from './components/Sidebar';
import AnnotationTools from './components/AnnotationTools';
import './styles.css';
import { clear } from '@testing-library/user-event/dist/clear';


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
  const [annotations, setAnnotations] = useState([]);
  const [floorAnnotations, setFloorAnnotations] = useState({});

  const canvasRef = useRef(null);
  const { zoom, setZoom } = useAppContext();
  const scrollRef = useRef(null);
  const zoomRef = useRef(zoom);
  const lastZoomCenter = useRef(null);







  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
  
    const floorKey = getCurrentFloorKey();
    if (!floorKey) return;

    const zoomedWidth = mapSize.width * zoom;
    const zoomedHeight = mapSize.height * zoom;
    canvas.width = zoomedWidth;
    canvas.height = zoomedHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const currentAnnotations = floorAnnotations[floorKey] || [];
    ctx.save();
    drawAnnotations(ctx, currentAnnotations);
    ctx.restore();
  };


  // Handle map selection and removes the floor, used for when moving to a new map selection after being on a floor
  const handleMapSelect = (map) => {
    setSelectedMap(map);
    setSelectedFloor(null);
  };

  // Handle operator placement onto the screen
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

  // Save the current floor key to the state
  const getCurrentFloorKey = () => {
    if (!selectedMap || !selectedFloor) return null;
    return `${selectedMap.id}_${selectedFloor.name}`;
  };
  
  // Save the annotation to the current floor
  const saveAnnotationToFloor = (annotation) => {
    const floorKey = getCurrentFloorKey();
    if (!floorKey) return;
    setFloorAnnotations(prev => ({
      ...prev,
      [floorKey]: [...(prev[floorKey] || []), annotation]
    }));
  };
  
  //clears the current floor annotations
  const clearCurrentFloorAnnotations = () => {
    const floorKey = getCurrentFloorKey();
    if (!floorKey) return;
  
    setFloorAnnotations(prev => ({
      ...prev,
      [floorKey]: []
    }));
  };


  // Handle zooming in and out
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
  
  // Handle scrolling to center the map // dont know if this is needed
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const resizeCanvas = () => {
      const zoomedWidth = mapSize.width * zoom;
      const zoomedHeight = mapSize.height * zoom;
  
      canvas.width = zoomedWidth;
      canvas.height = zoomedHeight;
  
      redrawCanvas();
    };
  
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
  
    return () => resizeObserver.disconnect();
  }, [mapSize.width, mapSize.height, zoom]);


  // Draw the LINE annotation on the canvas
  const drawLine = (ctx, item) => {
    ctx.beginPath();
    ctx.moveTo(item.points[0].x * zoom, item.points[0].y * zoom);
    ctx.lineTo(item.points[1].x * zoom, item.points[1].y * zoom);
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.width * zoom;
    ctx.stroke();
  };

  // Draw the SHAPE annotation on the canvas
  const drawShape = (ctx, item) => {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.width * zoom;
    ctx.strokeRect(
      item.x * zoom,
      item.y * zoom,
      item.widthPx * zoom,
      item.heightPx * zoom
    );

    if (item.image) {
      if (!item._cachedImage) {
        const img = new Image();
        img.src = item.image;
        img.onload = () => {
          item._cachedImage = img; // Cache the loaded image
          ctx.drawImage(
            img,
            item.x * zoom,
            item.y * zoom,
            item.widthPx * zoom,
            item.heightPx * zoom
          );
        };
      } else {
        ctx.drawImage(
          item._cachedImage,
          item.x * zoom,
          item.y * zoom,
          item.widthPx * zoom,
          item.heightPx * zoom
        );
      }
    }
  };

  

  // Draw the TEXT annotation on the canvas
  const drawText = (ctx, item) => {
    ctx.fillStyle = item.color;
    ctx.font = `${item.size * zoom}px Arial`;
    ctx.fillText(item.text, item.x * zoom, item.y * zoom);
  };


  // Draw the STROKE / PEN annotation on the canvas
  const drawStroke = (ctx, stroke) => {
    if (!stroke.points.length) return;
    
    const scaledWidth = stroke.width * zoom;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x * zoom, stroke.points[0].y * zoom);
    stroke.points.slice(1).forEach(point => {
      ctx.lineTo(point.x * zoom, point.y * zoom);
    });
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = scaledWidth;
    ctx.stroke();
  };

  const drawAnnotations = (ctx, annotations) => {
    annotations.forEach(item => {
      if (!item || !item.type) return;

      switch (item.type) {
        case 'pen':
          drawStroke(ctx, item);
          break;
        case 'line':
          drawLine(ctx, item);
          break;
        case 'shape':
          drawShape(ctx, item);
          break;
        case 'text':
          drawText(ctx, item);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    if (!selectedMap || !selectedFloor) return;
  
    const img = new Image();
    img.onload = () => {
      setMapSize({ width: img.width, height: img.height });
    };
    img.src = selectedFloor?.image || selectedMap.thumbnail;
  }, [selectedMap, selectedFloor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      redrawCanvas();
    });
  
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, []);

  



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
    let currentStroke = null;
  
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      redrawCanvas();
    };
  
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };
  
    const startDrawing = (e) => {
      e.preventDefault();
      const pos = getPos(e);
      startX = pos.x / zoom;
      startY = pos.y / zoom;
      drawing = true;
  
      switch (currentTool) {
        case 'pen':
          currentStroke = {
            type: 'pen',
            color: 'red',
            width: 3,
            points: [{ x: startX, y: startY }],
          };
          break;
        case 'line':
          currentStroke = {
            type: 'line',
            color: 'blue',
            width: 3,
            points: [{ x: startX, y: startY }],
          };
          break;
        case 'shape':
          currentStroke = {
            type: 'shape',
            color: 'green',
            width: 3,
            x: startX,
            y: startY,
            widthPx: 0,
            heightPx: 0,
            image: 'https://i.redd.it/tg38bmozyek31.jpg'
          };
          break;
          case 'text':
            const userText = prompt('Enter text:');
            if (userText) {
              saveAnnotationToFloor({
                type: 'text',
                text: userText,
                x: startX,
                y: startY,
                color: 'Yellow',
                size: 20,
              });
            }
            drawing = false;
            break;
      }
    };
  
    const draw = (e) => {
      if (!drawing && currentTool !== 'eraser') return; // Allow erasing even if not "drawing"
      e.preventDefault();
      const pos = getPos(e);
    
      const isPointNear = (x1, y1, x2, y2, threshold = 10) => {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return dx * dx + dy * dy <= threshold * threshold;
      };
    
      if (currentTool === 'eraser') {
        const x = pos.x / zoom;
        const y = pos.y / zoom;
        const floorKey = getCurrentFloorKey();
      
        setFloorAnnotations((prev) => {
          const current = prev[floorKey] || [];
          const updated = current.filter((item) => {
            if (item.type === 'pen' || item.type === 'line') {
              // Check if any point in the stroke is near the eraser
              return !item.points.some((p) => isPointNear(p.x, p.y, x, y, 10 / zoom));
            } else if (item.type === 'shape') {
              // Normalize the shape's bounding box
              const x1 = Math.min(item.x, item.x + item.widthPx);
              const x2 = Math.max(item.x, item.x + item.widthPx);
              const y1 = Math.min(item.y, item.y + item.heightPx);
              const y2 = Math.max(item.y, item.y + item.heightPx);
      
              // Check if the eraser overlaps with the normalized bounding box
              const withinX = x >= x1 && x <= x2;
              const withinY = y >= y1 && y <= y2;
              return !(withinX && withinY);
            } else if (item.type === 'text') {
              // Check if the eraser is near the text position
              return !isPointNear(item.x, item.y, x, y, 10 / zoom);
            }
            return true;
          });
      
          // Clear cached images for erased shapes
          current.forEach((item) => {
            if (!updated.includes(item) && item.type === 'shape' && item._cachedImage) {
              delete item._cachedImage;
            }
          });
      
          return { ...prev, [floorKey]: updated };
        });
      
        return;
      }
    
      const canvasPos = {
        x: pos.x / zoom,
        y: pos.y / zoom,
      };
    
      switch (currentTool) {
        case 'pen':
          currentStroke.points.push(canvasPos);
          break;
        case 'line':
          currentStroke.points = [
            { x: startX, y: startY },
            canvasPos,
          ];
          break;
        case 'shape':
          currentStroke.widthPx = canvasPos.x - startX;
          currentStroke.heightPx = canvasPos.y - startY;
          break;
      }
    
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const floorKey = getCurrentFloorKey();
      const currentAnnotations = floorAnnotations[floorKey] || [];
      drawAnnotations(ctx, currentAnnotations);
    
      if (currentStroke) {
        switch (currentStroke.type) {
          case 'pen':
            drawStroke(ctx, currentStroke);
            break;
          case 'line':
            drawLine(ctx, currentStroke);
            break;
          case 'shape':
            drawShape(ctx, currentStroke);
            break;
        }
      }
    };
  
    const stopDrawing = (e) => {
      if (!drawing) return;
      drawing = false;
  
      if (currentStroke) {
        saveAnnotationToFloor(currentStroke);
        currentStroke = null;
      }
      redrawCanvas();
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
  }, [currentTool, selectedMap, selectedFloor, zoom, floorAnnotations]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const floorKey = getCurrentFloorKey();
    if (!floorKey) return;
  
    const currentAnnotations = floorAnnotations[floorKey] || [];
    drawAnnotations(ctx, currentAnnotations);
  }, [floorAnnotations, zoom, selectedFloor, selectedMap]);

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
        customOnClick={clearCurrentFloorAnnotations}
      />
    </>
  );

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
  };

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

          <div className={`flex ${toolLayout === 'vertical' ? 'flex-row' : 'flex-col'} gap-6 flex-1 overflow-hidden`}>
            {toolLayout === 'vertical' && <div className="flex flex-col gap-2 w-28 shrink-0">{renderToolButtons()}</div>}
          
            
            {/* Map Viewer */}
            <div className="relative bg-gray-200 flex-1 flex justify-center items-center rounded overflow-hidden">
              <div className="w-full h-full overflow-auto relative cursor-grab active:cursor-grabbing"
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
                  
                    // Calculate the center of the viewport
                    const viewportCenterX = scrollLeft + container.clientWidth / 2;
                    const viewportCenterY = scrollTop + container.clientHeight / 2;
                  
                    const oldZoom = zoomRef.current;
                    const newZoom = e.deltaY < 0 ? Math.min(zoom + 0.1, 3) : Math.max(zoom - 0.1, 0.5);
                  
                    // Calculate the scale factor
                    const scale = newZoom / oldZoom;
                  
                    // Adjust scroll position to keep the center of the viewport in place
                    const newScrollLeft = viewportCenterX * scale - container.clientWidth / 2;
                    const newScrollTop = viewportCenterY * scale - container.clientHeight / 2;
                  
                    container.scrollLeft = newScrollLeft;
                    container.scrollTop = newScrollTop;
                  
                    zoomRef.current = newZoom;
                    setZoom(newZoom);
                  
                    redrawCanvas();
                  }}>

                  {/* Floor selection buttons */}
                  {selectedMap && (
                              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 bg-white/80 p-2 rounded shadow">
                                  {selectedMap.floors.map((floor) => (
                                    <button
                                      key={floor.name}
                                      className={`px-3 py-1 rounded font-semibold ${
                                        selectedFloor?.name === floor.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                                      onClick={() => handleFloorSelect(floor)}>
                                      {floor.name}
                                    </button>
                                  ))}
                                </div>
                            )}


                  <div className="relative flex-1 h-full flex justify-center items-center">
                    { /*Scrollable Area*/}
                    <div
                      className="relative flex-1 h-full flex justify-center items-center"
                      ref={scrollRef}>
                      {selectedMap ? (
                        <div
                          style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'center center',
                            transition: 'transform 0.1s ease-out',
                            position: 'relative',
                            width: `${mapSize.width}px`,
                            height: `${mapSize.height}px`,
                          }}>
                          {/* Map Image */}
                          <img
                            src={selectedFloor?.image || selectedMap.thumbnail}
                            alt={`${selectedMap.name} - ${selectedFloor?.name || 'Overview'}`}
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
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
                            style={{
                              width: `${mapSize.width}px`,
                              height: `${mapSize.height}px`,
                            }}
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
