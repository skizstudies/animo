export interface WeatherReading {
  id: string;
  label: string;
  value: string;
  icon: "rain" | "temp" | "humidity";
}

export const WEATHER_READINGS: WeatherReading[] = [
  { id: "rain", label: "Rainfall", value: "32mm", icon: "rain" },
  { id: "temp", label: "Temperature", value: "26°C", icon: "temp" },
  { id: "humidity", label: "Humidity", value: "88%", icon: "humidity" },
];

export const WEATHER_SOURCE_UPDATED = "Updated 6 min ago";
