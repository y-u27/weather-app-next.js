"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Select,
  Stack,
  Text,
  useRadio,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { WeatherType } from "../types/weatherType";

type City = {
  id: number;
  name: string;
  queryName: string;
};

const Weather = () => {
  // プルダウンメニューで選択する都市名のuseState
  const [city, setCity] = useState("");
  // 天気情報表示用の都市名のuseState
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  async function fetchAllWeather() {
    const resWeather = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/weather?city=${encodeURIComponent(city)}`,
      {
        cache: "no-store",
      }
    );
    const dataWeather = await resWeather.json();
    setWeather(dataWeather.data);
    setSelectedCity(city);
  }

  useEffect(() => {
    const fetchSelectCity = async () => {
      const resCity = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/city`,
        {
          cache: "no-store",
        }
      );
      const dataCity = await resCity.json();
      setCities(dataCity);
      console.log(dataCity);
    };
    fetchSelectCity();
  }, []);

  return (
    <>
      <Stack py={6} align="center">
        <Box>
          <Text color="blue.400" fontSize="4xl">
            天気アプリ
          </Text>
        </Box>
      </Stack>

      <Box px={4} py={10}>
        <Stack spacing={2} align="center">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={3}
            align="center"
            w="100%"
            maxW="md"
          >
            <Select
              placeholder="都市を選択してください"
              onChange={(e) => setCity(e.target.value)}
              w="full"
            >
              {cities.map(
                (city: { id: number; name: string; queryName: string }) => (
                  <option key={city.id} value={city.queryName}>
                    {city.name}
                  </option>
                )
              )}
            </Select>
            <Button
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={fetchAllWeather}
              w={{ base: "full", md: "auto" }}
            >
              検索
            </Button>
          </Stack>

          {/* 天気結果表示 */}
          {weather && (
            <Card w="100%" maxW="md" border="1px" borderColor="teal.300">
              <CardBody>
                <Text>都市名：{selectedCity}</Text>
                <Text>天気：{weather.weather}</Text>
                <Text>気温：{weather.temperature}</Text>
                <Text>
                  日時：{new Date(weather.observed_at).toLocaleString()}
                </Text>
              </CardBody>
            </Card>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Weather;
