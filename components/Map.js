// components/Map.js
'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const DynamicMapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const DynamicTileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const DynamicMarker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const DynamicPopup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

const Map = ({ locations }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <DynamicMapContainer center={[0, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
            <DynamicTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
            />
            {locations.map((location, idx) => (
                <DynamicMarker key={idx} position={[location.latitude, location.longitude]}>
                    <DynamicPopup>
                        Location: ({location.latitude}, {location.longitude}) at {new Date(location.timestamp * 1000).toISOString()}
                    </DynamicPopup>
                </DynamicMarker>
            ))}
        </DynamicMapContainer>
    );
};

export default Map;