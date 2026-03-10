import { NextRequest, NextResponse } from "next/server";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const { slug } = await context.params;

  // TODO: Fetch business from DB
  // const business = await prisma.business.findUnique({
  //   where: { slug },
  //   include: { services: true, availability: true },
  // });

  // Mock response matching the public booking page data structure
  const business = {
    id: "biz_123",
    name: "Studio Bloom",
    slug,
    description: "Beauty and wellness studio in downtown Portland.",
    imageUrl: null,
    services: [
      {
        id: "svc_1",
        name: "Haircut",
        description: "Precision haircut and style",
        durationMinutes: 45,
        priceInCents: 5500,
      },
      {
        id: "svc_2",
        name: "Color Treatment",
        description: "Full color or highlights",
        durationMinutes: 120,
        priceInCents: 15000,
      },
      {
        id: "svc_3",
        name: "Blowout",
        description: "Wash and blowdry styling",
        durationMinutes: 30,
        priceInCents: 3500,
      },
    ],
    availability: {
      timezone: "America/Los_Angeles",
      schedule: [
        { day: "monday", startTime: "09:00", endTime: "17:00" },
        { day: "tuesday", startTime: "09:00", endTime: "17:00" },
        { day: "wednesday", startTime: "09:00", endTime: "17:00" },
        { day: "thursday", startTime: "09:00", endTime: "19:00" },
        { day: "friday", startTime: "09:00", endTime: "19:00" },
        { day: "saturday", startTime: "10:00", endTime: "16:00" },
      ],
    },
  };

  return NextResponse.json(business);
}
