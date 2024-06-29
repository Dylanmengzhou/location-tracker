"use client";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import MapMarkerIcon from "../public/marker-icon.png";
import Link from "next/link";

const Map = ({ locations }) => {
  const [isClient, setIsClient] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setIsClient(true);
    if (locations.length > 0) {
      setLocation(locations[locations.length - 1]);
    }
  }, [locations]);

  if (!isClient) {
    return null;
  }

  const customIcon = new L.Icon({
    iconUrl: MapMarkerIcon.src,
    iconSize: [25, 41],
  });

  const ZoomToLocation = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location) {
        map.setView([location.latitude, location.longitude], 19); // Adjust the zoom level as needed
      }
    }, [location, map]);

    return null;
  };

  const openInGoogleMaps = (location) => {
    if (location) {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <Link href="/" className="absolute top-3 right-5 bg-black rounded text-white p-2" style={{ zIndex: 1000}}>Live</Link>
      <button
        onClick={() => openInGoogleMaps(locations[locations.length - 1])}
        className="bg-green-500 h-12 w-30 absolute lg:bottom-24 bottom-28  right-3 p-2 rounded-lg text-white"
        style={{ zIndex: 1000 }}
      >
        Show in Google
      </button>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline
          positions={locations.map((location) => [
            location.latitude,
            location.longitude,
          ])}
        />
        {locations.length > 0 && (
          <Marker
            position={[
              locations[locations.length - 1].latitude,
              locations[locations.length - 1].longitude,
            ]}
            icon={customIcon}
          >
            <Popup>
              Location: ({locations[locations.length - 1].latitude},{" "}
              {locations[locations.length - 1].longitude}) at{" "}
              {new Date(
                locations[locations.length - 1].timestamp * 1000
              ).toISOString()}
            </Popup>
          </Marker>
        )}
        {location && <ZoomToLocation location={location} />}
      </MapContainer>
    </>
  );
};

export default Map;
