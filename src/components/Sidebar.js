import React from 'react';

const Sidebar = ({ maps, onMapSelect, onFloorSelect }) => {
  return (
    <div className="sidebar">
      <h2>Select Map</h2>
      <ul>
        {maps.map(map => (
          <li key={map.id}>
            <button onClick={() => onMapSelect(map)}>{map.name}</button>
            {/* Floor selection inside map */}
            <ul>
              {map.floors.map(floor => (
                <li key={floor}>
                  <button onClick={() => onFloorSelect(floor)}>{floor}</button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
