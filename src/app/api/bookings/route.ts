import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createBookingSchema = z.object({
  businessId: z.string(),
  serviceId: z.string(),
  startTime: z.string().datetime(),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createBookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // TODO: Look up business and service in DB
    // const business = await prisma.business.findUnique({ where: { id: data.businessId } });
    // const service = await prisma.service.findUnique({ where: { id: data.serviceId } });

    // TODO: Check availability for the requested time slot
    // TODO: Create booking record in DB
    // const booking = await prisma.booking.create({ data: { ... } });

    // TODO: Send confirmation email to client
    // TODO: Send notification to business owner

    // Mock response — replace with actual DB record
    const booking = {
      id: crypto.randomUUID(),
      ...data,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
