import React, { useState } from 'react';

const OperatorSidebar = ({ operators, onOperatorSelect, onClearOperators, zoom, setPlacedOperators, setDraggingOperator, setDraggingTouch, selectedOperatorToPlace, setSelectedOperatorToPlace }) => {
  const [filter, setFilter] = useState('All');

  const filteredOperators =
    filter === 'All' ? operators : operators.filter(op => op.role === filter);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-center">Operators</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        {['All', 'Attacker', 'Defender'].map((role) => (
          <button
            key={role}
            className={`px-3 py-1 rounded font-semibold ${
              filter === role ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setFilter(role)}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Scrollable Operator Grid */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2">
        <div className="grid grid-cols-3 gap-4">
        {filteredOperators.map(op => (
          <div
            key={op.name}
            className={`flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded transition ${selectedOperatorToPlace?.name === op.name ? 'ring-2 ring-blue-500' : ''}`}
            draggable
            onClick={() => setSelectedOperatorToPlace(op)}
            onDragStart={e => {
              setDraggingOperator(op);
              e.dataTransfer.setData('operator', JSON.stringify(op));
            }}
            onDragEnd={() => {
              setDraggingOperator(null);
            }}
            onTouchStart={e => {
              setDraggingOperator(op);
              setDraggingTouch({
                startX: e.touches[0].clientX,
                startY: e.touches[0].clientY,
              });
            }}
            onTouchEnd={() => {
              setDraggingOperator(null);
              setDraggingTouch(null);
            }}
          >
            <img
              src={op.image}
              alt={op.name}
              className="cursor-pointer"
              draggable={false}
              style={{ pointerEvents: 'none' }} // Prevents the img from blocking parent events
            />
            <span className="mt-1 text-sm text-center">{op.name}</span>
          </div>
        ))}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="sticky bottom-0 left-0 right-0 bg-gray-800 pt-2 pb-4 px-6 border-t border-gray-600 z-10">
        <button
            onClick={onClearOperators}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
            Clear Operators
        </button>
        </div>
    </div>
  );
};

export default OperatorSidebar;
