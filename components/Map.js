// components/Map.js
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import MapWithPins from "./MapWithPins";
import { MapContainer, useMap } from "react-leaflet";

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const Map = ({ location, refreshLocation }) => {
  const [isClient, setIsClient] = useState(false);
  const [shouldZoom, setShouldZoom] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const ZoomToLocation = ({ location, shouldZoom }) => {
    const map = useMap();

    useEffect(() => {
      if (location && shouldZoom) {
        map.setView([location.latitude, location.longitude], 10); // Adjust the zoom level as needed
      }
    }, [location, shouldZoom]);

    return null;
  };

  const handleRefreshLocation = async () => {
    await refreshLocation();
    setShouldZoom(true);
  };

  const handleGoogleMapRedirect = () => {
    if (location) {
      const { latitude, longitude } = location;
      const googleMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(googleMapUrl, "_blank");
    }
  };

  return (
    <>
      <button
        onClick={handleRefreshLocation}
        className="bg-blue-500 h-12 w-30 absolute bottom-10 right-10 m-4 p-2 rounded-lg text-white z-10"
        style={{ zIndex: 1000 }}
      >
        Refresh Pins
      </button>
      <button
        onClick={handleGoogleMapRedirect}
        className="bg-green-500 h-12 w-30 absolute bottom-24 right-10 m-4 p-2 rounded-lg text-white z-10"
        style={{ zIndex: 1000 }}
      >
        Google Maps
      </button>
      <DynamicMapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <ZoomToLocation location={location} shouldZoom={shouldZoom} />
        <MapWithPins location={location} />
      </DynamicMapContainer>
    </>
  );
};

export default Map;
