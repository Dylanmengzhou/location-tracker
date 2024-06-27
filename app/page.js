// app/page.js
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map"), { ssr: false });

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

    // Set up interval for fetching location
    const interval = setInterval(fetchLatestLocation, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div>
        <DynamicMap location={location} refreshLocation={fetchLatestLocation} />
      </div>
    </main>
  );
}
