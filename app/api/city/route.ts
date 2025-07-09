import prisma from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

// 地域名取得
export async function GET(request: Request) {
  const cities = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(cities);
}
