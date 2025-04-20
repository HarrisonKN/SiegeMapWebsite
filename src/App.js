import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import OperatorSidebar from './components/OperatorSidebar';
import OperatorData from './components/OperatorData';
import mapsData from './components/MapData';
import ForumPage from './components/ForumPage'; 
import UserAccountPage from './components/UserAccountsPage';
import AuthPage from './components/UserLoginRegPage';
import { supabase } from './supabaseClient';
import { useUser } from './context/UserContext';

import './styles.css';



import { Routes, Route, Link, useLocation } from 'react-router-dom';

const App = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 640);
  const [isOperatorSidebarOpen, setIsOperatorSidebarOpen] = useState(() => window.innerWidth >= 640);
  const [currentTool, setCurrentTool] = useState(null);
  const [toolLayout, setToolLayout] = useState('horizontal');
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  const [setSelectedOperator] = useState(null);
  const [placedOperators, setPlacedOperators] = useState([]);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [floorAnnotations, setFloorAnnotations] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [draggedOpIndex, setDraggedOpIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingOperator, setDraggingOperator] = useState(null);
  const [draggingTouch, setDraggingTouch] = useState(null); 
  const [selectedOperatorToPlace, setSelectedOperatorToPlace] = useState(null);

  const { user } = useUser();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const { zoom, setZoom } = useAppContext();
  const scrollRef = useRef(null);
  const zoomRef = useRef(zoom);
  const lastZoomCenter = useRef(null);

  // Hook to get the current route
  const location = useLocation();


  const handleLoadSetup = (setup) => {
    const selectedMapObj = mapsData.find(m => m.name === setup.map_name);
    setSelectedMap(selectedMapObj);
  
    if (selectedMapObj) {
      const selectedFloorObj = selectedMapObj.floors.find(f => f.name === setup.floor_name);
      setSelectedFloor(selectedFloorObj);
  
      // Set annotations
      if (selectedMapObj && selectedFloorObj) {
        setFloorAnnotations(prev => ({
          ...prev,
          [`${selectedMapObj.id}_${selectedFloorObj.name}`]: Array.isArray(setup.data)
            ? setup.data
            : (setup.data?.annotations || [])
        }));
      }
    }
  
    // Set placed operators (support both .operators and .data.operators for compatibility)
    if (setup.operators) {
      setPlacedOperators(setup.operators);
    } else if (setup.data && setup.data.operators) {
      setPlacedOperators(setup.data.operators);
    } else {
      setPlacedOperators([]);
    }
  
    // Optionally navigate to main view if not already there
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleSaveToAccount = async () => {
    if (!user) {
      alert("You must be logged in to save setups to your account.");
      return;
    }
    const floorKey = getCurrentFloorKey();
    if (!floorKey) return;
    const setupData = floorAnnotations[floorKey] || [];
    const mapName = selectedMap?.name || 'map';
    const floorName = selectedFloor?.name || 'floor';
    const title = prompt("Enter a title for this setup:") || "Untitled";
    const error = await saveSetupToAccount({ mapName, floorName, title, setupData, operators: placedOperators });
    if (!error) {
      alert("Setup saved to your account!");
      setShowModal(false);
    } else {
      alert("Failed to save setup.");
    }
  };

  const handleSaveAsImage = async () => {
    const floorKey = getCurrentFloorKey();
    if (!floorKey) return;
  
    const currentAnnotations = floorAnnotations[floorKey] || [];
  
    // Create a new canvas for saving the image
    const saveCanvas = document.createElement('canvas');
    saveCanvas.width = mapSize.width;
    saveCanvas.height = mapSize.height;
    const saveCtx = saveCanvas.getContext('2d');
    if (!saveCtx) return;
  
    // Draw the map image onto the save canvas
    const mapImage = new Image();
    mapImage.crossOrigin = 'anonymous';
    mapImage.src = selectedFloor?.image || selectedMap.thumbnail;
  
    mapImage.onload = async () => {
      saveCtx.drawImage(mapImage, 0, 0, mapSize.width, mapSize.height);
  
      // 1. Draw all shapes (border/background) first
      currentAnnotations.forEach((item) => {
        if (item.type === 'shape') {
          // Draw border/background for all shapes
          saveCtx.save();
          if (item.fill) {
            saveCtx.fillStyle = item.fill;
            saveCtx.fillRect(item.x, item.y, item.widthPx, item.heightPx);
          }
          saveCtx.strokeStyle = item.color || 'black';
          saveCtx.lineWidth = item.width || 2;
          saveCtx.strokeRect(item.x, item.y, item.widthPx, item.heightPx);
          saveCtx.restore();
        }
      });
  
      // When saving, use the cached image if available
      const shapeImagePromises = currentAnnotations
      .filter((item) => item.type === 'shape' && item.image)
      .map((shape) => {
        return new Promise((resolve) => {
          let img = shape._cachedImage;
          if (img) {
            saveCtx.drawImage(img, shape.x, shape.y, shape.widthPx, shape.heightPx);
            resolve();
          } else {
            // fallback: load as before
            const shapeImage = new Image();
            shapeImage.crossOrigin = 'anonymous';
            shapeImage.src = shape.image;
            shapeImage.onload = () => {
              saveCtx.drawImage(shapeImage, shape.x, shape.y, shape.widthPx, shape.heightPx);
              resolve();
            };
            shapeImage.onerror = () => {
              console.error(`Failed to load shape image: ${shape.image}`);
              resolve();
            };
          }
        });
      });
      await Promise.all(shapeImagePromises);
  
      // 3. Draw all other annotations (pen, line, text)
      currentAnnotations.forEach((item) => {
        switch (item.type) {
          case 'pen':
            drawStroke(saveCtx, item, 1);
            break;
          case 'line':
            drawLine(saveCtx, item, 1);
            break;
          case 'shape':
            drawShape(saveCtx, item, 1);
            break;
          case 'text':
            drawText(saveCtx, item, 1);
            break;
          default:
            break;
        }
      });
  
      // 4. Draw all operator images
      const operatorPromises = placedOperators.map((op) => {
        return new Promise((resolve) => {
          const operatorImage = new Image();
          operatorImage.crossOrigin = 'anonymous';
          operatorImage.src = op.image;
          operatorImage.onload = () => {
            saveCtx.drawImage(operatorImage, op.x, op.y, 40, 40);
            resolve();
          };
          operatorImage.onerror = () => {
            console.error(`Failed to load operator image: ${op.image}`);
            resolve();
          };
        });
      });
      await Promise.all(operatorPromises);
  
      // 5. Save the canvas as an image
      let mapName = selectedMap?.name || 'map';
      let floorName = selectedFloor?.name || 'floor';
      // Clean up names for file system
      mapName = mapName.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
      floorName = floorName.replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
      const fileName = `${mapName}_${floorName}_annotations.png`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = saveCanvas.toDataURL('image/png');
      link.click();
    };
  
    mapImage.onerror = () => {
      console.error('Failed to load map image. Ensure the image supports cross-origin requests.');
    };
  };

  async function saveSetupToAccount({ mapName, floorName, title, setupData, operators }) {
    const { error } = await supabase.from('site_setups').insert([
      {
        user_id: user.id,
        map_name: mapName,
        floor_name: floorName,
        title,
        data: {
          annotations: setupData,
          operators: operators || [],
        }
      }
    ]);
    return error;
  }

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
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  // Handle operator placement onto the screen
  const handleDrop = (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    // Normalize drop position by zoom
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
  
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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
  
    let isTouching = false;
    let lastTouch = { x: 0, y: 0 };
  
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isTouching = true;
        lastTouch = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
  
    const onTouchMove = (e) => {
      if (!isTouching || e.touches.length !== 1) return;
      e.preventDefault();
      const touch = e.touches[0];
      const dx = lastTouch.x - touch.clientX;
      const dy = lastTouch.y - touch.clientY;
      container.scrollLeft += dx;
      container.scrollTop += dy;
      lastTouch = {
        x: touch.clientX,
        y: touch.clientY,
      };
    };
  
    const onTouchEnd = () => {
      isTouching = false;
    };
  
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
  
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(true);
        setIsOperatorSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
        setIsOperatorSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (!showSettings) return;
    const handleClick = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSettings]);
  
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
  const drawLine = (ctx, item, scale = zoom) => {
    ctx.beginPath();
    ctx.moveTo(item.points[0].x * scale, item.points[0].y * scale);
    ctx.lineTo(item.points[1].x * scale, item.points[1].y * scale);
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.width * scale;
    ctx.stroke();
  };

  // Draw the SHAPE annotation on the canvas
  const drawShape = (ctx, item, scale = zoom) => {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.width * scale;
    ctx.strokeRect(
      item.x * scale,
      item.y * scale,
      item.widthPx * scale,
      item.heightPx * scale
    );
    if (item.image) {
      const img = item._cachedImage || new window.Image();
      img.src = item.image;
      ctx.drawImage(
        img,
        item.x * scale,
        item.y * scale,
        item.widthPx * scale,
        item.heightPx * scale
      );
    }
  };

  

  // Draw the TEXT annotation on the canvas
  const drawText = (ctx, item, scale = zoom) => {
    ctx.fillStyle = item.color;
    ctx.font = `${item.size * scale}px Arial`;
    ctx.fillText(item.text, item.x * scale, item.y * scale);
  };


  // Draw the STROKE / PEN annotation on the canvas
  const drawStroke = (ctx, stroke, scale = zoom) => {
    if (!stroke.points.length) return;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x * scale, stroke.points[0].y * scale);
    stroke.points.slice(1).forEach(point => {
      ctx.lineTo(point.x * scale, point.y * scale);
    });
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width * scale;
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
            image: '/images/ReinforcedWall.jpg'
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
      <ToolButton
        label="Mouse"
        icon="fas fa-mouse-pointer"
        current={currentTool}
        setCurrent={setCurrentTool}
        customOnClick={() => setCurrentTool(null)} // Deselect any active tool
        tooltip="Select and move items (default tool)"
      />
      <ToolButton label="Pen" icon="fas fa-pencil-alt" current={currentTool} setCurrent={setCurrentTool} tooltip="Freehand draw lines on the Map" />
      <ToolButton label="Line" icon="fas fa-random" current={currentTool} setCurrent={setCurrentTool} tooltip="Draw Straight lines on the map" />
      <ToolButton label="Shape" icon="fas fa-square" current={currentTool} setCurrent={setCurrentTool} tooltip="Draw Reinforcement walls on the map" />
      <ToolButton label="Text" icon="fas fa-font" current={currentTool} setCurrent={setCurrentTool} tooltip="Add text onto the map"/>
      <ToolButton label="Eraser" icon="fas fa-eraser" current={currentTool} setCurrent={setCurrentTool} tooltip="Erase whole annotations by hovering over them" />
      <ToolButton
        label="Clear"
        icon="fas fa-trash-alt"
        current={currentTool}
        setCurrent={setCurrentTool}
        customOnClick={clearCurrentFloorAnnotations}
        tooltip="Clear all annotations on the current floor"
      />
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        onClick={() => setShowModal(true)}>Save Setup</button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Save Setup</h2>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              onClick={handleSaveAsImage}>Download Image</button>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              onClick={handleSaveToAccount}>Save to Account</button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
              onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center ml-2">
        <span className="text-xs text-gray-700 font-semibold mb-1">Zoom:{Math.round(zoom * 100)}%</span>
        <div className={`flex gap-1 ${toolLayout === 'vertical' ? 'flex-col' : 'flex-row'}`}>
          <ZoomButton label="Zoom In" icon="fas fa-search-plus" onClick={() => setZoom(prev => Math.min(prev + 0.1, 3))} />
          <ZoomButton label="Zoom Out" icon="fas fa-search-minus" onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))} />
          <ZoomButton label="Reset" icon="fas fa-compress" onClick={() => setZoom(1)} />
        </div>
      </div>
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full transition-colors
          ${draggedOpIndex !== null || draggingOperator ? 'bg-red-600' : 'bg-gray-400'}`}
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        id="operator-bin"
      >
        <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
          <path d="M9 3v1H4v2h16V4h-5V3H9zm-4 5v13c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H5zm2 2h6v11H7V10z"/>
        </svg>
      </div>  
    </>
  );

  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
  };

  const ZoomButton = ({ label, icon, onClick }) => (
    <div
      className="p-1 sm:p-2 rounded text-center cursor-pointer hover:bg-gray-400 bg-gray-200 min-w-[36px] sm:min-w-[48px]"
      style={{ fontSize: '0.85rem' }}
      onClick={onClick}
    >
      <i className={`${icon} text-base sm:text-lg`}></i>
      <p className="font-semibold text-[10px] sm:text-xs mt-0.5">{label}</p>
    </div>
  );


  const Tooltip = ({ text, children }) => {
    const [show, setShow] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const ref = useRef();

    const handleMouseEnter = (e) => {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      setShow(true);
    };

    const handleMouseLeave = () => setShow(false);

    return (
      <>
        <div
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="inline-block"
        >
          {children}
        </div>
        {show &&
          createPortal(
            <div
              style={{
                position: 'fixed',
                left: coords.x,
                top: coords.y - 10,
                transform: 'translate(-50%, -100%)',
                zIndex: 9999,
                pointerEvents: 'none',
              }}
              className="px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-pre-line"
            >
              {text}
            </div>,
            document.body
          )}
      </>
    );
  };

  const ToolButton = ({ label, icon, current, setCurrent, customOnClick = null, tooltip }) => (
  <Tooltip text={tooltip}>
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
  </Tooltip>
);

  return (
    <div className="flex flex-col h-screen">

      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-lg font-semibold text-center sm:text-left w-full sm:w-auto">
          R6 Siege Map Annotations
        </div>
        <div className="flex flex-row flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-center items-center">
          <Link
            to="/"
            className="flex items-center justify-center min-w-[120px] text-center bg-gray-600 px-2 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-500 active:bg-gray-700 transition duration-150"
            onClick={() => {
              setSelectedMap(null);
              setSelectedFloor(null);
              setFloorAnnotations({});
              setPlacedOperators([]);
            }}
          >
            Home
          </Link>
          <Link
            to="/site-setups"
            className="flex items-center justify-center min-w-[120px] text-center bg-gray-600 px-2 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-500 active:bg-gray-700 transition duration-150"
          >
            Site Setups
          </Link>
          {user ? (
            <Link
              to="/UserAccount"
              className="flex items-center justify-center min-w-[120px] text-center bg-gray-600 px-2 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-500 active:bg-gray-700 transition duration-150"
            >
              Account
            </Link>
          ) : (
            <Link
              to="/auth"
              className="flex items-center justify-center min-w-[120px] text-center bg-gray-600 px-2 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-500 active:bg-gray-700 transition duration-150"
            >
              Login/Register
            </Link>
          )}
          <div className="relative flex items-center justify-center min-w-[120px]">
            <button
              className="w-full bg-gray-600 px-2 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-500 active:bg-gray-700 transition duration-150 text-center"
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </button>
            {showSettings && (
              <div 
                ref={settingsRef}
                className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-4 z-10 w-48">
                <label className="block mb-2 font-semibold">Tool Layout</label>
                <select
                  className="w-full p-2 border rounded"
                  value={toolLayout}
                  onChange={(e) => {
                    setToolLayout(e.target.value);
                    setShowSettings(false);
                  }}
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
      <Routes>
            <Route path="/" element={<React.Fragment>
              {/* Map Sidebar */}
              {isSidebarOpen && (
                <div className="bg-gray-800 text-white w-70 flex-shrink-0 h-full z-40 sm:static overflow-y-auto">
                  <div className={`bg-gray-800 text-white w-full sm:w-64 p-4 ${
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
                </div>
              )}
              {!isSidebarOpen && (
                <button
                  className="fixed left-0 top-1/2 z-50 bg-blue-600 text-white px-3 py-2 rounded-r shadow"
                  onClick={() => setIsSidebarOpen(true)}
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <span className="hidden sm:inline">Map</span>
                  <span className="sm:hidden">M</span>
                </button>
              )}
          

              {/* Main Content Area */}
              <div className="flex-1 bg-white p-4 flex flex-col overflow-hidden">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to R6 Siege Map Annotations</h1>
                <p className="text-lg text-gray-600">Select a map, choose a floor, and start annotating!</p>

                <div className={`flex ${toolLayout === 'vertical' ? 'flex-row' : 'flex-col'} gap-6 flex-1 overflow-hidden`}>
                
                  {/* Floor buttons for mobile */}
                  {selectedMap && (
                    <div className="sm:hidden w-full flex justify-center gap-2 bg-white/90 p-2 rounded shadow mb-2 z-30">
                      {selectedMap.floors.map((floor) => (
                        <button
                          key={floor.name}
                          className={`px-3 py-1 rounded font-semibold ${
                            selectedFloor?.name === floor.name ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                          }`}
                          onClick={() => handleFloorSelect(floor)}
                        >
                          {floor.name}
                        </button>
                      ))}
                    </div>
                  )}
                  
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

                        {/* Floor selection buttons for Desktop */}
                        {selectedMap && (
                          <div className="hidden sm:flex absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 bg-white/80 p-2 rounded shadow">
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
                                    className={`absolute w-10 h-10 rounded-full border-2 border-white cursor-move z-20 ${draggedOpIndex === index ? 'ring-4 ring-blue-400' : ''}`}
                                    style={{
                                      top: `${op.y}px`,
                                      left: `${op.x}px`,
                                      transform: `scale(${1 / zoom})`,
                                      touchAction: 'none', // Prevents default scrolling while dragging
                                    }}
                                    draggable                               
                                    onContextMenu={(e) => {
                                      e.preventDefault();
                                      setPlacedOperators((prev) => prev.filter((_, i) => i !== index));
                                    }}
                                    // --- Touch support ---
                                    onDragStart={e => {
                                      setDraggedOpIndex(index);
                                      setDragOffset({
                                        x: e.nativeEvent.offsetX * zoom,
                                        y: e.nativeEvent.offsetY * zoom,
                                      });
                                    }}
                                    onDragEnd={e => {
                                      setDraggedOpIndex(null);
                                      const bin = document.getElementById('operator-bin');
                                      if (bin) {
                                        const binRect = bin.getBoundingClientRect();
                                        if (
                                          e.clientX >= binRect.left &&
                                          e.clientX <= binRect.right &&
                                          e.clientY >= binRect.top &&
                                          e.clientY <= binRect.bottom
                                        ) {
                                          setPlacedOperators(prev => prev.filter((_, i) => i !== index));
                                        }
                                      }
                                    }}
                                    onTouchStart={e => {
                                      setDraggedOpIndex(index);
                                      const touch = e.touches[0];
                                      setDragOffset({
                                        x: touch.clientX - op.x * zoom,
                                        y: touch.clientY - op.y * zoom,
                                      });
                                    }}
                                    onTouchMove={e => {
                                      if (draggedOpIndex === index) {
                                        e.preventDefault();
                                        const touch = e.touches[0];
                                        setPlacedOperators(prev => {
                                          const updated = [...prev];
                                          updated[index] = {
                                            ...updated[index],
                                            x: (touch.clientX - dragOffset.x) / zoom,
                                            y: (touch.clientY - dragOffset.y) / zoom,
                                          };
                                          return updated;
                                        });
                                      }
                                    }}
                                    onTouchEnd={e => {
                                      setDraggedOpIndex(null);
                                      const bin = document.getElementById('operator-bin');
                                      if (bin && e.changedTouches && e.changedTouches.length > 0) {
                                        const touch = e.changedTouches[0];
                                        const binRect = bin.getBoundingClientRect();
                                        if (
                                          touch.clientX >= binRect.left &&
                                          touch.clientX <= binRect.right &&
                                          touch.clientY >= binRect.top &&
                                          touch.clientY <= binRect.bottom
                                        ) {
                                          setPlacedOperators(prev => prev.filter((_, i) => i !== index));
                                        }
                                      }
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
                                  onClick={e => {
                                    if (selectedOperatorToPlace) {
                                      const rect = e.target.getBoundingClientRect();
                                      const x = (e.clientX - rect.left) / zoom;
                                      const y = (e.clientY - rect.top) / zoom;
                                      setPlacedOperators(prev => [...prev, { ...selectedOperatorToPlace, x, y }]);
                                      setSelectedOperatorToPlace(null);
                                    }
                                  }}
                                  onDrop={e => {
                                    if (draggingOperator) {
                                      const rect = e.target.getBoundingClientRect();
                                      const x = (e.clientX - rect.left) / zoom;
                                      const y = (e.clientY - rect.top) / zoom;
                                      setPlacedOperators(prev => [...prev, { ...draggingOperator, x, y }]);
                                      setDraggingOperator(null);
                                    }
                                  }}
                                  onDragOver={e => e.preventDefault()}
                                  onTouchEnd={e => {
                                    if (selectedOperatorToPlace) {
                                      const touch = e.changedTouches[0];
                                      const rect = e.target.getBoundingClientRect();
                                      const x = (touch.clientX - rect.left) / zoom;
                                      const y = (touch.clientY - rect.top) / zoom;
                                      setPlacedOperators(prev => [...prev, { ...selectedOperatorToPlace, x, y }]);
                                      setSelectedOperatorToPlace(null);
                                    }
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center w-full h-full text-xl text-gray-500 bg-gray-200/70">
                                Select a map to view it here.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                  </div>

                  <div className={`flex ${toolLayout === 'vertical' ? 'flex-row ' : 'flex-col items-center justify-center'} gap-6`}>
                    {/* Tool Buttons */}
                    <div className={toolLayout === 'vertical' ? "flex flex-col gap-2 w-28 shrink-0 overflow-y-auto" : "flex flex-wrap gap-2 w-full items-center justify-center"}>
                      {renderToolButtons()}
                    </div>
                  </div>
                </div>
              </div>
              
              
              {/* Operator Sidebar */}
              <div className={`bg-gray-800 text-white ${isOperatorSidebarOpen ? 'fixed inset-0 z-50' : 'sm:w-64'} sm:static h-full`}>
                {isOperatorSidebarOpen && (
                  <div className="relative bg-gray-800 text-white w-full sm:w-64 p-4 h-full">
                  <button
                    className="absolute top-2 right-2 text-white z-50"
                    onClick={() => setIsOperatorSidebarOpen(false)}
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                  <div className="bg-gray-800 text-white w-full sm:w-64 p-4 h-full">
                  <OperatorSidebar
                    operators={OperatorData}
                    onClearOperators={() => setPlacedOperators([])}
                    zoom={zoom}
                    setPlacedOperators={setPlacedOperators}
                    setDraggingOperator={setDraggingOperator}
                    setDraggingTouch={setDraggingTouch}
                    selectedOperatorToPlace={selectedOperatorToPlace}
                    setSelectedOperatorToPlace={setSelectedOperatorToPlace}
                  />
                  </div>
                </div>
                )}
              </div>
              {/* Show open button when sidebar is closed */}
              {!isOperatorSidebarOpen && (
                <button
                  className="fixed right-0 top-1/2 z-50 bg-blue-600 text-white px-3 py-2 rounded-l shadow"
                  onClick={() => setIsOperatorSidebarOpen(true)}
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <span className="hidden sm:inline">Operators</span>
                  <span className="sm:hidden">O</span>
                </button>
              )}
              </React.Fragment>} />
          <Route path="/site-setups" element={<ForumPage handleLoadSetup={handleLoadSetup} />} />
          <Route path="/UserAccount" element={<UserAccountPage handleLoadSetup={handleLoadSetup}/>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default () => (
  <AppProvider>
    <App />
  </AppProvider>
);
