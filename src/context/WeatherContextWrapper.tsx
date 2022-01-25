import React, { useState } from "react";
import { WeatherContext } from ".";

export default function WeatherContextWrapper({ children }: any) {
  const [showSwiper, setShowSwiper] = useState<boolean>(false);

  return (
    <WeatherContext.Provider value={[showSwiper, setShowSwiper]}>
      {children}
    </WeatherContext.Provider>
  );
}
