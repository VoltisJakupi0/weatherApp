import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Image,
  Platform,
} from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import List from "../components/List";
import { geoApiKey } from "../constants/apiKey";
import GeoDBCitiesSearch from "react-native-geodb";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { ReducerTypes } from "../reducers";
import { getWeatherInformationForCity } from "../actions/weather-actions";
import { WeatherContext } from "../context";

interface WeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
}

function FavoriteCitiesWeatherScreen({
  navigation,
  route,
}: WeatherScreenProps): ReactElement {
  const weather = useSelector((state: ReducerTypes) => state.weather);
  const dispatch = useDispatch();
  const [location, setLocation] = useState<any>();
  const [favoriteCities, setFavoriteCities] = useState<any>([]);
  const [lat, setLat] = useState<any>();
  const [lon, setLon] = useState<any>();
  const [, setCity] = useContext<any>(WeatherContext);

  useEffect(() => {
    getUserLocation();
    getFavoriteCities();
  }, [route.params]);

  useEffect(() => {
    navigateToDetail();
  }, [lat, lon, weather, dispatch]);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Alert.alert("Permission to access location was denied", "", []);
      return;
    }
    let locationPosition = await Location.getCurrentPositionAsync({});

    let address = await Location.reverseGeocodeAsync({
      latitude: locationPosition.coords.latitude,
      longitude: locationPosition.coords.longitude,
    });

    var city = address[0]?.city;

    setCity(city);

    const isYourLocationInFavorite = favoriteCities?.findIndex(
      (item: any) => item.city == city
    );

    if (isYourLocationInFavorite) {
      return;
    } else {
      Alert.alert("Do you wanna see the weather for your location?", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            getWeatherInformationForCity(
              locationPosition.coords.latitude.toString(),
              locationPosition.coords.longitude.toString()
            ),
        },
      ]);
      setLocation(location);
    }
  };

  const getFavoriteCities = async () => {
    const favoriteCities: any = await AsyncStorage.getItem("favoriteCities");
    setFavoriteCities(JSON.parse(favoriteCities));
  };

  const navigateToDetail = async () => {
    if (weather?.current) {
      let address = await Location.reverseGeocodeAsync({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      });
      weather.city = address[0]?.city;
      setCity(weather.city);
      navigation.navigate("InfoWeather", { weatherDetails: weather });
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.platformView}>
        <Text style={styles.platformText}>
          {Platform.OS == "ios" ? "running in ios" : "running in android"}
        </Text>
      </View>
      <ScrollView>
        <GeoDBCitiesSearch
          placeholder="Search cities"
          onSelectItem={(data: any) => {
            setLat(data.latitude);
            setLon(data.longitude);
            dispatch(
              getWeatherInformationForCity(data.latitude, data.longitude)
            );
          }}
          hidePoweredBy={true}
          query={{
            key: geoApiKey,
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
        <View style={styles.emptyView}>
          <Image
            style={styles.emptyImage}
            source={require("../../assets/images/clock.png")}
          />
          <Text style={styles.emptyText}>No favorites cities yet...</Text>
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
    marginBottom: 8,
    color: "grey",
  },
  contentContainerInput: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f2f2f2",
  },
  emptyView: {
    marginTop: 200,
    alignItems: "center",
  },
  emptyImage: {
    width: 100,
    height: 100,
  },
  emptyText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
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
  platformView: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  platformText: {
    fontSize: 10,
    paddingRight: 10,
    color: "grey",
  },
});

export default FavoriteCitiesWeatherScreen;
