"use client";

import { Box, Button, Card, CardBody, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { WeatherType } from "../types/weatherType";

type City = {
  id: number;
  name: string;
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  async function fetchAllWeather() {
    const resWeather = await fetch(
      `http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`,
      {
        cache: "no-store",
      }
    );
    const dataWeather = await resWeather.json();
    setWeather(dataWeather.data);
  }

  useEffect(() => {
    const fetchSelectCity = async () => {
      const resCity = await fetch(`http://localhost:3000/api/city`, {
        cache: "no-store",
      });
      const dataCity = await resCity.json();
      setCities(dataCity);
      console.log(dataCity);
    };
    fetchSelectCity();
  }, []);

  return (
    <Box>
      <Box boxSize="20%" p={5} display="flex">
        <Select
          placeholder="都市を選択"
          onChange={(e) => setCity(e.target.value)}
        >
          {cities.map((city: { id: number; name: string }) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </Select>
        <Button onClick={fetchAllWeather}>検索</Button>
      </Box>

      {/* 天気結果表示 */}
      {weather && (
        <Card>
          <CardBody>
            <Text>都市名：{city}</Text>
            <Text>天気：{weather.weather}</Text>
            <Text>気温：{weather.temperature}</Text>
            <Text>日時：{new Date(weather.observed_at).toLocaleString()}</Text>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default Weather;
