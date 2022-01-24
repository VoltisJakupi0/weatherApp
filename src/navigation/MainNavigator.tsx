import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import DetailCityWeatherScreen from "../screens/DetailCityWeatherScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="FavoriteCitiesTab"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InfoWeather"
          component={DetailCityWeatherScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
