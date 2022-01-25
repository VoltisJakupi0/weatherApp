import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import TabBarIcon from "../components/TabBarIcon";
import InformationScreen from "../screens/InformationScreen";
import FavoriteCitiesWeatherScreen from "../screens/FavoriteCitiesWeatherScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }: any) {
  navigation.setOptions({ headerShown: false });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarActiveTintColor: "#A4DAFF",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Information"
        component={InformationStackScreen}
        options={{
          title: "Information",
          headerShown: false,
          tabBarActiveTintColor: "#A4DAFF",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-information" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={FavoriteCitiesWeatherScreen}
      />
    </HomeStack.Navigator>
  );
}

const InformationStack = createStackNavigator();
function InformationStackScreen() {
  return (
    <InformationStack.Navigator>
      <InformationStack.Screen
        name="Information"
        options={{ headerShown: false }}
        component={InformationScreen}
      />
    </InformationStack.Navigator>
  );
}
