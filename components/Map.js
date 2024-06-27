// components/Map.js
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import MapWithPins from "./MapWithPins";

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const Map = ({ location, refreshLocation }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        <MapWithPins location={location} />
      </DynamicMapContainer>
    </>
  );
};

export default Map;
