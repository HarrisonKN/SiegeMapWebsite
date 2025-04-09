import React, { useState } from 'react';

const OperatorSidebar = ({ operators, onOperatorSelect, onClearOperators }) => {
  const [filter, setFilter] = useState('All');

  const filteredOperators =
    filter === 'All' ? operators : operators.filter(op => op.role === filter);

  return (
    <div className="sidebar h-full flex flex-col">
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
      <div className="flex-1 overflow-y-auto px-2">
        <div className="grid grid-cols-3 gap-4">
          {filteredOperators.map(op => (
            <div
              key={op.name}
              className="flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded transition"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('operator', JSON.stringify(op));
              }}
              onClick={() => onOperatorSelect(op)}
            >
              <div className="w-16 h-16">
                <img
                  src={op.image}
                  alt={op.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-1 text-sm text-center">{op.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="pt-2 pb-12 px-6 border-t border-gray-600">
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
