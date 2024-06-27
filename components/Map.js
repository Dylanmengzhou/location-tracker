"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const DynamicPopup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const Map = ({ location, refreshLocation }) => {
  const [isClient, setIsClient] = useState(false);
  const map = useMap();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (location && map) {
      map.setView([location.latitude, location.longitude], 15); // Zoom level 15, you can adjust this as needed
    }
  }, [location, map]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <button
        onClick={refreshLocation}
        className="bg-blue-500 h-12 w-30 absolute bottom-10 right-10 m-4 p-2 rounded-lg text-white z-10"
        style={{ zIndex: 1000 }}
      >
        Refresh Pins
      </button>
      <DynamicMapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <DynamicTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {location && (
          <DynamicMarker position={[location.latitude, location.longitude]}>
            <DynamicPopup>
              Location: ({location.latitude}, {location.longitude}) at{" "}
              {new Date(location.timestamp * 1000).toISOString()}
            </DynamicPopup>
          </DynamicMarker>
        )}
      </DynamicMapContainer>
    </>
  );
};

export default Map;
