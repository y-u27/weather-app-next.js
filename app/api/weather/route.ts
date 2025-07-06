import prisma from "@prisma/client";
import { Router } from "next/router";

const router = Router;

export async function get() {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const weatherAPI = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`
  );
}
