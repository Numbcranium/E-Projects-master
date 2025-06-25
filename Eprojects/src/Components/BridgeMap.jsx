
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

// Component to fly to a new location when bridge changes
function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center, 10);
  return null;
}

const BridgeMap = ({ bridge }) => {
  const position = [bridge.latitude, bridge.longitude];

  return (
    <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
      <ChangeMapView center={position} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{bridge.name}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default BridgeMap;
