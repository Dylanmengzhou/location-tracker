// components/Map.js
"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import MapWithPins from "./MapWithPins";
import { MapContainer, useMap } from "react-leaflet";
import Link from "next/link";

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

  const ZoomToLocation = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location) {
        map.setView([location.latitude, location.longitude], 19); // Adjust the zoom level as needed
      }
    }, [location]);

    return null;
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
      <Link href="./datePicker" className="absolute top-3 right-5 bg-black rounded text-white p-2" style={{ zIndex: 1000}}>History</Link>
      <button
        onClick={refreshLocation}
        className="bg-blue-500 h-12 w-30 absolute bottom-0 lg:right-3 right-0 m-4 lg:mr-0 p-2 rounded-lg text-white"
        style={{ zIndex: 1000 }}
      >
        Refresh Pins
      </button>
      <button
        onClick={handleGoogleMapRedirect}
        className="bg-green-500 h-12 w-30 absolute bottom-14 lg:right-3 right-0 m-4 lg:mr-0 p-2 rounded-lg text-white"
        style={{ zIndex: 1000 }}
      >
        Open in Google
      </button>
      <DynamicMapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <ZoomToLocation location={location} />
        <MapWithPins location={location} />
      </DynamicMapContainer>
    </>
  );
};

export default Map;
