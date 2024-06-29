// app/api/location/route.js
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const { latitude, longitude, timestamp } = await req.json();

    const client = await clientPromise;
    const db = client.db("gps"); // Replace with your database name
    const collection = db.collection("locations");

    const newLocation = { latitude, longitude, timestamp };
    await collection.insertOne(newLocation);

    console.log(
      `Received location: (${latitude}, ${longitude}) at ${new Date(
        timestamp * 1000
      ).toISOString()}`
    );
    return NextResponse.json({ message: "Location received" });
  } catch (error) {
    console.error("Error in POST /api/location:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("gps"); // Replace with your database name
    const collection = db.collection("locations");

    const locations = await collection.find({}).toArray();
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error in GET /api/location:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
