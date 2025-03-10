// components/MapWithPins.js
"use client";
import { useEffect, useState } from "react";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MapMarkerIcon from "../public/marker-icon.png";

const MapWithPins = ({ location }) => {
  const [isClient, setIsClient] = useState(false);
  const map = useMap();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && location) {
      map.setView([location.latitude, location.longitude], 15); // 调整缩放级别
    }
  }, [location, map, isClient]);

  if (!isClient) {
    return null;
  }
  {
    /* <Marker position={[location.latitude, location.longitude]} icon={icon}></Marker> */
  }
  const customIcon = new L.Icon({
    iconUrl: MapMarkerIcon.src,
    iconSize: [25, 41],
  });
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={60}
      />
      {location && (
        <Marker
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup>
            Location: ({location.latitude}, {location.longitude}) at{" "}
            {new Date(location.timestamp * 1000).toISOString()}
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MapWithPins;
