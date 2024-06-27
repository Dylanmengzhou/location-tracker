"use client";
import { useState, useEffect } from "react";
import Map from "../components/Map";

export default function Home() {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const res = await fetch("/api/location");
    const data = await res.json();
    setLocations(data);
  };

  useEffect(() => {
    // Initial fetch
    fetchLocations();

    // Set up an interval to fetch locations every 10 seconds
    const interval = setInterval(fetchLocations, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div>
        <Map locations={locations} refreshLocations={fetchLocations} />
      </div>
    </main>
  );
}