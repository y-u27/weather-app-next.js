import prisma from "@/app/lib/prismaClient";
import { NextResponse } from "next/server";

// 天気情報取得（openweathermap api）
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Tokyo";

  const apiKey = process.env.OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
  );

  const data = await response.json();

  const weather = data.weather[0].main;
  const temperature = Math.round(data.main.temp);
  const observed_at = new Date();

  // データベース保存
  await prisma.weather.create({
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
      data: data,
    },
    { status: 200 }
  );
}
