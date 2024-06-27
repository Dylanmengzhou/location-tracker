// app/page.js
'use client';
import { useState, useEffect } from 'react';
import Map from '../components/Map';

export default function Home() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const res = await fetch('/api/location');
            const data = await res.json();
            setLocations(data);
        };

        fetchLocations();
    }, []);

    return (
        <div>
            <Map locations={locations} />
        </div>
    );
}