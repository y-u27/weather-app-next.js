"use client";

import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  async function fetchAllWeather() {
    const res = await fetch(
      `http://localhost:3000/api/weather?city=${encodeURIComponent(city)}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    console.log(data);
  }

  return (
    <Box>
      <Box boxSize="20%" p={5} display="flex">
        <Input onChange={(e) => setCity(e.target.value)} />
        <Button onClick={fetchAllWeather}>検索</Button>
      </Box>
    </Box>
  );
};

export default Weather;
