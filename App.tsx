import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allReducers from "./src/reducers";
import MainNavigator from "./src/navigation/MainNavigator";
import WeatherContextWrapper from "./src/context/WeatherContextWrapper";
import useCachedResources from "./src/hooks/useCachedResources";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = createStore(allReducers, applyMiddleware(thunk));
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  // const setItem = async () => {
  //   await AsyncStorage.setItem("favoriteCities", "[]");
  // };

  // setItem();

  return (
    <WeatherContextWrapper>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </WeatherContextWrapper>
  );
}
