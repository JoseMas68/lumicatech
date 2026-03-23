import { NextRequest, NextResponse } from "next/server";
import {
  getAvailabilityConfig,
  saveAvailabilityConfig,
} from "@/src/lib/availability-config";

export async function GET() {
  const config = getAvailabilityConfig();
  return NextResponse.json(config);
}

export async function POST(request: NextRequest) {
  const config = await request.json();
  saveAvailabilityConfig(config);
  return NextResponse.json({ success: true });
}
