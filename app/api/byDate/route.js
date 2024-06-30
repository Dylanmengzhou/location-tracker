// app/api/byDate/route.js
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Date parameter is required" },
      { status: 400 }
    );
  }

  const startOfDay = new Date(date);
  const endOfDay = new Date(date);
  endOfDay.setDate(endOfDay.getDate() + 1);

  // Convert dates to Unix timestamps in seconds
  const startOfDayTimestamp = startOfDay.getTime() / 1000;
  const endOfDayTimestamp = endOfDay.getTime() / 1000;

  try {
    const client = await clientPromise;
    const db = client.db("gps");
    const collection = db.collection("locations");

    const locations = await collection
      .find({
        timestamp: {
          $gte: startOfDayTimestamp,
          $lt: endOfDayTimestamp,
        },
      })
      .toArray();

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}