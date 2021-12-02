import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";

interface WeatherDailyInfoCardProps {
  day: string;
  temperature: string;
  icon?: any;
}

function WeatherDailyInfoCard({
  day,
  temperature,
}: WeatherDailyInfoCardProps): ReactElement {
  return (
    <View style={styles.wrapperView}>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.temperatureText}>{temperature}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperView: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  dayText: { color: "white", fontWeight: "600", fontSize: 18 },
  temperatureText: {
    paddingTop: 15,
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
});

export default WeatherDailyInfoCard;
