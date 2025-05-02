import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PQPFMap = () => {
  return (
    <div style={{ height: '400px', marginTop: '1rem' }}>
      <MapContainer
        center={[28.6139, 77.209]} // You can make this dynamic later
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[28.6139, 77.209]}>
          <Popup>Sample Marker for PQPF</Popup>
        </Marker>
      </MapContainer>

    </div>
  );
};

export default PQPFMap;
