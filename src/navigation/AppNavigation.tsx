import { createStackNavigator } from "@react-navigation/stack";
import FavoriteCitiesWeatherScreen from "../screens/FavoriteCitiesWeatherScreen";
import DetailCityWeatherScreen from "../screens/DetailCityWeatherScreen";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Weather"
          options={{ headerShown: false }}
          component={FavoriteCitiesWeatherScreen}
        />
        <Stack.Screen
          name="InfoWeather"
          options={{ headerShown: false }}
          component={DetailCityWeatherScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
