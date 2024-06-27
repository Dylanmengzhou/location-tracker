// app/api/location/route.js
import { NextResponse } from 'next/server';

let locations = [];

export async function POST(req) {
    const { latitude, longitude, timestamp } = await req.json();
    locations.push({ latitude, longitude, timestamp });
    console.log(`Received location: (${latitude}, ${longitude}) at ${new Date(timestamp * 1000).toISOString()}`);
    return NextResponse.json({ message: 'Location received' });
}

export async function GET() {
    return NextResponse.json(locations);
}