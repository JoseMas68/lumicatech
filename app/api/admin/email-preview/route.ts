import { NextRequest, NextResponse } from "next/server";
import {
  generateClientEmailTemplate,
  generateOwnerEmailTemplate,
} from "@/src/lib/email";

const mockBooking = {
  name: "Carlos García",
  email: "carlos@empresa.com",
  company: "Empresa Ejemplo S.L.",
  message: "Me interesa hablar sobre automatización de procesos.",
  date: "2026-04-01",
  time: "10:00",
  meetLink: process.env.MEET_LINK || "https://meet.google.com/ijo-fddq-vjq",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "client";

  const html =
    type === "owner"
      ? generateOwnerEmailTemplate(mockBooking)
      : generateClientEmailTemplate(mockBooking);

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
