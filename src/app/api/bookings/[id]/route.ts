import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  // TODO: Fetch booking from DB
  // const booking = await prisma.booking.findUnique({ where: { id } });

  // Mock response
  const booking = {
    id,
    businessId: "biz_123",
    serviceId: "svc_456",
    startTime: new Date().toISOString(),
    clientName: "Jane Doe",
    clientEmail: "jane@example.com",
    clientPhone: null,
    notes: null,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(booking);
}

const updateBookingSchema = z.object({
  status: z.enum(["confirmed", "cancelled"]),
});

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const result = updateBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    // TODO: Update booking status in DB
    // const booking = await prisma.booking.update({
    //   where: { id },
    //   data: { status: result.data.status },
    // });

    // Mock response
    const booking = {
      id,
      status: result.data.status,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
