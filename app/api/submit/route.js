import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);

    const { name, age, message } = body;

    if (!name || !age || !message) {
      console.error("Validation failed: Missing fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "users"), {
      name,
      age,
      message,
      createdAt: new Date(),
    });

    console.log("Document written with ID:", docRef.id);
    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error.message, error.stack);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
