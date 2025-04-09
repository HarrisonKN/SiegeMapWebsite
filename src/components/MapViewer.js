import React, { useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapViewer = ({ selectedMap, selectedFloor }) => {
  const mapRef = useRef();

  const mapImageUrl = `/images/${selectedMap}/${selectedFloor}.png`;

  // You should know the actual image dimensions in pixels
  const imageWidth = 2048;
  const imageHeight = 2048;
  const imageBounds = [[0, 0], [imageHeight, imageWidth]];

  const CenterMap = () => {
    const map = useMap();

    useEffect(() => {
      map.fitBounds(imageBounds);
    }, [map, imageBounds]);

    return null;
  };

  return (
    <div className="map-wrapper relative w-full h-full">
      <MapContainer
        center={[0, 0]}
        zoom={0}
        minZoom={-2}
        maxZoom={4}
        crs={L.CRS.Simple}
        style={{ height: '600px', width: '100%' }}
        ref={mapRef}
      >
        <ImageOverlay url={mapImageUrl} bounds={imageBounds} />
        <CenterMap />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
