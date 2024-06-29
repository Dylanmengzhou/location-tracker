// app/api/location/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(req) {
  const { latitude, longitude, timestamp } = await req.json();

  const client = await clientPromise;
  const db = client.db('yourDatabaseName'); // Replace with your database name
  const collection = db.collection('locations');

  const newLocation = { latitude, longitude, timestamp };

  await collection.insertOne(newLocation);

  console.log(
    `Received location: (${latitude}, ${longitude}) at ${new Date(
      timestamp * 1000
    ).toISOString()}`
  );
  return NextResponse.json({ message: 'Location received' });
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName'); // Replace with your database name
  const collection = db.collection('locations');

  const locations = await collection.find({}).toArray();

  return NextResponse.json(locations);
}