import { createStackNavigator } from "@react-navigation/stack";
import WeatherScreen from "../screens/WeatherScreen";
import InfoWeatherScreen from "../screens/InfoWeatherScreen";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="InfoWeather" component={InfoWeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
