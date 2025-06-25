// components/BridgeMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url),
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url),
});

const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 10);
  return null;
};

const BridgeMap = ({ latitude, longitude, name }) => {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return <p>Invalid map coordinates.</p>;
  }

  const position = [latitude, longitude];

  return (
    <MapContainer center={position} zoom={10} style={{ height: '400px', width: '100%' }}>
      <ChangeMapView center={position} />
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors, &copy; CartoDB'
      />
      <Marker position={position}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default BridgeMap;
