"use client";

import { Box, Button, Card, CardBody, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { WeatherType } from "../types/weatherType";

type City = {
  id: number;
  name: string;
  queryName: string;
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
    <>
      <Box position="relative">
        <Box
          width="20%"
          pt="10%"
          display="flex"
          position="absolute"
          left="40%"
          zIndex="10"
        >
          <Select
            placeholder="都市を選択してください"
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map(
              (city: { id: number; name: string; queryName: string }) => (
                <option key={city.id} value={city.queryName}>
                  {city.name}
                </option>
              )
            )}
          </Select>
          <Box px="3%">
            <Button
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={fetchAllWeather}
            >
              検索
            </Button>
          </Box>
        </Box>

        <Box width="20%" pt="14%" position="absolute" top="30%" left="40%">
          {/* 天気結果表示 */}
          {weather && (
            <Card border="1px" borderColor="teal.300">
              <CardBody>
                <Text>都市名：{city}</Text>
                <Text>天気：{weather.weather}</Text>
                <Text>気温：{weather.temperature}</Text>
                <Text>
                  日時：{new Date(weather.observed_at).toLocaleString()}
                </Text>
              </CardBody>
            </Card>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Weather;
