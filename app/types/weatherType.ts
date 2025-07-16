export interface WeatherType {
  id: number;
  city: string;
  weather: string;
  temperature: number;
  observed_at: Date | string;
}
