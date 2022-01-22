import React, { ReactElement, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { ListItemType } from "../components/ListItem";
import List from "../components/List";
import axios from "axios";
import { APIkey } from "../constants/apiKey";
import GeoDBCitiesSearch from "react-native-geodb";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

// const data: ListItemType[] = [
//   {
//     temperature: "2°C",
//     background: require("../../assets/images/rainy.jpeg"),
//     city: "Prishtina",
//   },
//   {
//     temperature: "8°C",
//     background: require("../../assets/images/sunnyday.jpeg"),
//     city: "London",
//   },
//   {
//     temperature: "-4°C",
//     background: require("../../assets/images/snow.jpeg"),
//     city: "Budapest",
//   },
//   {
//     temperature: "12°C",
//     background: require("../../assets/images/cloudy.jpeg"),
//     city: "Tirana",
//   },
// ];

function FavoriteCitiesWeatherScreen({
  navigation,
}: WeatherScreenProps): ReactElement {
  const [location, setLocation] = useState<any>();
  const [favoriteCities, setFavoriteCities] = useState<any>([]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied", "", []);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
    getFavoriteCities();
  }, []);

  const getFavoriteCities = async () => {
    const favoriteCities: any = await AsyncStorage.getItem("favoriteCities");

    setFavoriteCities(JSON.parse(favoriteCities));
  };

  const getWeatherInformationForCity = (lat: string, lon: string) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${APIkey}`
      )
      .then((json) => {
        navigation.navigate("InfoWeather", { weatherDetails: json.data });
      });
  };

  return (
    <View style={styles.mainView}>
      <ScrollView contentContainerStyle={{ backgroundColor: "red" }}>
        <GeoDBCitiesSearch
          placeholder="Search cities"
          onSelectItem={(data: any) =>
            getWeatherInformationForCity(data.latitude, data.longitude)
          }
          hidePoweredBy={true}
          query={{
            key: "17e8938b1cmsh1ae9f6891830f33p14f194jsn27a9154bc6d0",
            api: "geo",
            types: "cities",
          }}
          params={{
            language: "en",
            limit: 5,
            offset: 0,
          }}
          styles={{
            textInputContainer: styles.searchInput,
            contentContainer: styles.contentContainerInput,
          }}
        />
      </ScrollView>

      {favoriteCities?.length > 0 ? (
        <>
          <View style={styles.topMarginView} />
          <Text style={styles.favoriteCityText}>Your favorite cities</Text>
          <ScrollView>
            <List navigation={navigation} data={favoriteCities} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.centerView}>
          <Text>No favorites cities yet...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 65,
  },
  topMarginView: { marginTop: 30 },
  favoriteCityText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 13,
    // marginTop: 40,
    marginBottom: 8,
    color: "grey",
  },
  contentContainerInput: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  centerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
    paddingLeft: 18,
    paddingRight: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default FavoriteCitiesWeatherScreen;
