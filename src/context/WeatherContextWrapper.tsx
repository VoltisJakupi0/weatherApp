import React, { useState } from "react";
import { WeatherContext } from ".";

export default function WeatherContextWrapper({ children }: any) {
  const [city, setCity] = useState<string>("");

  return (
    <WeatherContext.Provider value={[city, setCity]}>
      {children}
    </WeatherContext.Provider>
  );
}
