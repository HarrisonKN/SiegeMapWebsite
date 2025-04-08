import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapViewer = ({ selectedMap, selectedFloor }) => {
  const [mapZoom, setMapZoom] = useState(13);

  // Example of dynamically loading the map for a selected floor
  const mapImageUrl = `/images/${selectedMap}/${selectedFloor}.png`;

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={mapZoom} style={{ height: "600px", width: "100%" }}>
        <TileLayer url={mapImageUrl} />
        {/* Add markers, floor layers, or annotations here */}
      </MapContainer>
    </div>
  );
};

export default MapViewer;
