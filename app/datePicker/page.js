"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DynamicMap = dynamic(() => import("../../components/Date"), {
  ssr: false,
});

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [timelineValue, setTimelineValue] = useState(0);
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(
        `/api/byDate?date=${date.toISOString().split("T")[0]}`
      );
      const data = await res.json();
      console.log("Fetched locations:", data); // 添加日志
      setLocations(data);
      setFilteredLocations(data);
    };
    fetchLocations();
  }, [date]);

  useEffect(() => {
    if (locations.length > 0) {
      const index = Math.floor((timelineValue / 100) * locations.length);
      setFilteredLocations(locations.slice(0, index + 1));

      // Calculate the display time based on the timeline value
      const startTime = new Date(date);
      const endTime = new Date(date);
      endTime.setHours(23, 59, 59);
      const timeDifference = endTime - startTime;
      const currentTime = new Date(
        startTime.getTime() + (timelineValue / 100) * timeDifference
      );

      setDisplayTime(currentTime.toLocaleTimeString());
    }
  }, [timelineValue, locations, date]);

  useEffect(() => {
    console.log("Date changed:", date);
    console.log("Filtered locations:", filteredLocations);
  }, [date, filteredLocations]);

  const handleFocus = (e) => {
    const { target } = e;

    if (target) {
      target.readOnly = true; // -------> this for all others
      target.blur(); //  ------> this for ios iphone, TV Browsers, Ipad, Safari
    }
  };

  return (
    <main className="h-full">
      <div className="controls content-center" style={styles.controls}>
        <div style={styles.dateTimeWrapper}>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="text-black text-center"
            onFocus={handleFocus}
          />
          <span className="text-black">{displayTime}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={timelineValue}
          onChange={(e) => setTimelineValue(e.target.value)}
          className="w-full"
        />
      </div>
      <DynamicMap locations={filteredLocations} />
    </main>
  );
}

const styles = {
  controls: {
    position: "absolute",
    bottom: "0",
    width: "100%", // Ensure it adapts to the screen width on mobile devices
    zIndex: 1000,
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the controls container horizontally
  },
  dateTimeWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center DatePicker and span vertically
    marginBottom: "10px", // Add some margin at the bottom for spacing
  },
};
