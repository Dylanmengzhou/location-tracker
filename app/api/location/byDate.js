import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const startOfDay = new Date(date);
  const endOfDay = new Date(date);
  endOfDay.setDate(endOfDay.getDate() + 1);

  try {
    const client = await clientPromise;
    const db = client.db("gps");
    const collection = db.collection("locations");

    const locations = await collection
      .find({
        timestamp: {
          $gte: startOfDay.getTime() / 1000,
          $lt: endOfDay.getTime() / 1000,
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
