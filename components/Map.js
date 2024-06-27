// components/Map.js
'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ locations }) => {
    return (
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
            />
            {locations.map((location, idx) => (
                <Marker key={idx} position={[location.latitude, location.longitude]}>
                    <Popup>
                        Location: ({location.latitude}, {location.longitude}) at {new Date(location.timestamp * 1000).toISOString()}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;