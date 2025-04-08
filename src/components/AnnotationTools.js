import React, { useRef, useEffect } from 'react';
import { Canvas, PencilBrush } from 'fabric'; // Import named exports from fabric

const AnnotationTools = ({ canvasId }) => {
  const canvasRef = useRef(null);
  let canvasInstance = null;

  useEffect(() => {
    // Initialize the Fabric.js canvas
    canvasInstance = new Canvas(canvasId);

    // Setup canvas properties (e.g., freehand drawing tool)
    const pencil = new PencilBrush(canvasInstance);
    canvasInstance.freeDrawingBrush = pencil;
    canvasInstance.isDrawingMode = true; // Enable drawing mode

    return () => {
      // Clean up the canvas instance when the component unmounts
      canvasInstance.dispose();
    };
  }, [canvasId]);

  const clearCanvas = () => {
    if (canvasInstance) {
      canvasInstance.clear();
    }
  };

  return (
    <div>
      <canvas id={canvasId} ref={canvasRef} width="800" height="600"></canvas>
      <button onClick={clearCanvas}>Clear Annotations</button>
    </div>
  );
};

export default AnnotationTools;