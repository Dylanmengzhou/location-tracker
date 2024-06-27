// components/MapWithPins.js
"use client";
import { useEffect, useState } from "react";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";

const icon = L.icon({ iconUrl: "../public/marker-icon.png" });
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
  const sizeMarkerIcon = 50;

  const IconMarker = icon({
    iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`<?xml version="1.0" encoding="iso-8859-1"?>
      <svg xmlns="http://www.w3.org/2000/svg" width="0.67em" height="1em" viewBox="0 0 1024 1536">
        <path fill="purple" d="M768 512q0-106-75-181t-181-75t-181 75t-75 181t75 181t181 75t181-75t75-181m256 0q0 109-33 179l-364 774q-16 33-47.5 52t-67.5 19t-67.5-19t-46.5-52L33 691Q0 621 0 512q0-212 150-362T512 0t362 150t150 362" />
      </svg>
    `)}`,
    iconSize: [sizeMarkerIcon, sizeMarkerIcon],
    iconAnchor: [sizeMarkerIcon / 2, sizeMarkerIcon],
    popupAnchor: [0, -sizeMarkerIcon],
  });
  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={20}
      />
      {location && (
        <Marker
          position={[location.latitude, location.longitude]}
          icon={IconMarker}
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
