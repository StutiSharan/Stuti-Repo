import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ lat, lng }) {
  return (
    <div className="h-80 w-full rounded-xl shadow">
      <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>Property Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
