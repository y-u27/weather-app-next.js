import prisma from "@/app/lib/prismaClient";
import { data } from "framer-motion/client";
import { NextResponse } from "next/server";

// 天気情報取得（openweathermap api）
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Tokyo";

  const apiKey = process.env.OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )},JP&appid=${apiKey}&units=metric&lang=ja`
  );

  const savedWeather = await response.json();

  // レスポンスの中身を確認
  console.log("OpenWeather API Response:", savedWeather);

  if (!savedWeather.weather || !savedWeather.weather[0]) {
    return NextResponse.json(
      {
        success: false,
        message: "天気データの取得に失敗",
        data: savedWeather,
      },
      { status: 500 }
    );
  }

  const weather = savedWeather.weather[0].main;
  const temperature = Math.round(savedWeather.main.temp);
  const observed_at = new Date();

  const cityRecord = await prisma.city.findUnique({
    where: { name: city },
  });

  if (!cityRecord) {
    throw new Error("都市が存在しません");
  }

  // データベース保存
  const createWeather = await prisma.weather.create({
    data: {
      city,
      weather,
      temperature,
      observed_at,
      cityId: cityRecord.id,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: `${city}の天気情報`,
      data: createWeather,
    },
    { status: 200 }
  );
}
