import { NextResponse } from 'next/server';

export async function GET() {
  // Clear cookies/session here if you’re using auth
  return NextResponse.json({ message: "Logged out" });
}
