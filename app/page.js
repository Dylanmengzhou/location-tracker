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
  }, []); // Only run once when the component mounts

  return (
    <main>
      <div>
        <DynamicMap location={location} refreshLocation={fetchLatestLocation} />
      </div>
    </main>
  );
}
