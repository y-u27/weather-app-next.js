import prisma from "@/src/app/lib/prismaClient";
import { NextResponse } from "next/server";

// 天気情報取得（openweathermap api）
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") || "Tokyo";

  const today = new Date();
  // 同日判定のために時刻を00:00にリセット
  today.setHours(0, 0, 0, 0);

  const cityRecord = await prisma.city.findUnique({
    where: { name: city },
  });

  if (!cityRecord) {
    throw new Error("都市が存在しません");
  }

  // 今日の天気情報がDBにあるかを確認
  const existingWeather = await prisma.weather.findFirst({
    where: {
      cityId: cityRecord.id,
      observed_at: { gte: today },
    },
  });

  // もしすでにあるなら、天気APIを呼ばずに以下を返す
  if (existingWeather) {
    return NextResponse.json(
      {
        success: true,
        message: `${city}の天気情報（DBから取得）`,
        data: existingWeather,
      },
      { status: 200 }
    );
  }

  // DBに事前の天気情報がない場合→天気APIを呼ばない場合
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric&lang=ja`
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
