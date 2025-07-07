import { PrismaClient } from "@prisma/client";
import { data } from "framer-motion/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 天気情報取得（openweathermap api）
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Tokyo";

  const apiKey = process.env.OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric&lang=ja`
  );

  const data = await response.json();

  return NextResponse.json(
    {
      success: true,
      message: `${city}の天気情報`,
      data: data,
    },
    { status: 200 }
  );
}

// 天気情報作成
export async function POST(request: Request) {
  const { city, weather, temperature, observed_at } = await request.json();

  const weathers = await prisma.weather.create({
    data: {
      city,
      weather,
      temperature,
      observed_at,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: `${city}の天気情報`,
      data: weathers,
    },
    { status: 201 }
  );
}
