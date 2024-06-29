"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DynamicMap = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [timelineValue, setTimelineValue] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`/api/location/byDate?date=${date.toISOString().split('T')[0]}`);
      const data = await res.json();
      setLocations(data);
      setFilteredLocations(data);
    };
    fetchLocations();
  }, [date]);

  useEffect(() => {
    if (locations.length > 0) {
      const index = Math.floor((timelineValue / 100) * locations.length);
      setFilteredLocations(locations.slice(0, index + 1));
    }
  }, [timelineValue, locations]);

  return (
    <main>
      <div className="controls">
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <input
          type="range"
          min="0"
          max="100"
          value={timelineValue}
          onChange={(e) => setTimelineValue(e.target.value)}
        />
      </div>
      <DynamicMap locations={filteredLocations} />
    </main>
  );
}