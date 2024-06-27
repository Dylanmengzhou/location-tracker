"use client";
import { useState, useEffect } from "react";
import Map from "../components/Map";

export default function Home() {
  const [location, setLocation] = useState(null);

  const fetchLatestLocation = async () => {
    const res = await fetch("/api/location");
    const data = await res.json();
    if (data.length > 0) {
      setLocation(data[data.length - 1]);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLatestLocation();

    // Set up an interval to fetch locations every 10 seconds
    const interval = setInterval(fetchLatestLocation, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div>
        <Map location={location} refreshLocation={fetchLatestLocation} />
      </div>
    </main>
  );
}
