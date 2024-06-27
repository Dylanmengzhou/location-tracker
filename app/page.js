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
    // 初始获取
    fetchLatestLocation();

    // 设置一个间隔每10秒获取一次位置
    const interval = setInterval(fetchLatestLocation, 10000);

    // 在组件卸载时清除间隔
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
