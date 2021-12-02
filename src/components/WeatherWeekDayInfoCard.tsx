import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";

interface WeatherWeekDayInfoCardProps {
  day: string;
  temperature: string;
  icon?: any;
}

function WeatherWeekDayInfoCard({
  day,
  temperature,
}: WeatherWeekDayInfoCardProps): ReactElement {
  return (
    <View style={styles.wrapperView}>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.temperatureText}>{temperature}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperView: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // borderTopWidth: 1,
    // borderColor: "white",
    height: 40,
  },
  dayText: { color: "white", fontWeight: "600", fontSize: 18 },
  temperatureText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
});

export default WeatherWeekDayInfoCard;
