import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import List from "../components/List";
import { APIkey, geoApiKey } from "../constants/apiKey";
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

export const checkConnected = () => {
  return NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    return state.isConnected;
  });
};

function FavoriteCitiesWeatherScreen({
  navigation,
}: WeatherScreenProps): ReactElement {
  const weatherForecastForCityResponse = useSelector(
    (state: ReducerTypes) => state.weather
  );
  const dispatch = useDispatch();
  const [favoriteCities, setFavoriteCities] = useState<any>([]);
  const [lat, setLat] = useState<any>();
  const [lon, setLon] = useState<any>();
  const [, setShowSwiper] = useContext<any>(WeatherContext);
  const ref: any = useRef();
  const netInfo = useNetInfo();

  useEffect(() => {
    loadData();
    getUserLocation();
    focusSubscription();
  }, []);

  useEffect(() => {
    navigateToDetail();
  }, [lat, lon, weatherForecastForCityResponse, dispatch]);

  const focusSubscription = () => {
    const willFocusSubscription: any = navigation.addListener("focus", () => {
      getFavoriteCities();
      return willFocusSubscription;
    });
  };

  const loadData = () => {
    getFavoriteCities();
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied", "", []);
      return;
    }
    let locationPosition = await Location.getCurrentPositionAsync({});

    const showedLocationPopUp = await AsyncStorage.getItem(
      "showedLocationPopUp"
    );

    if (showedLocationPopUp == undefined) {
      await AsyncStorage.setItem("showedLocationPopUp", "");
    }

    if (showedLocationPopUp == "true") {
      return;
    } else {
      Alert.alert("Do you wanna see the weather for your location?", "", [
        {
          text: "Cancel",
          style: "cancel",
          onPress: async () => {
            await AsyncStorage.setItem("showedLocationPopUp", "true");
          },
        },
        {
          text: "OK",
          onPress: async () => {
            setLat(locationPosition.coords.latitude);
            setLon(locationPosition.coords.longitude);
            dispatch(
              getWeatherInformationForCity(
                locationPosition.coords.latitude.toString(),
                locationPosition.coords.longitude.toString()
              )
            );
            await AsyncStorage.setItem("showedLocationPopUp", "true");
          },
        },
      ]);
    }
  };

  const getFavoriteCities = async () => {
    const favoriteCitiesFromStorage: any = await AsyncStorage.getItem(
      "favoriteCities"
    );

    const arr: any[] = [];

    if (JSON.parse(favoriteCitiesFromStorage)?.length > 0) {
      if ((await checkConnected()) == true) {
        for (let x in JSON.parse(favoriteCitiesFromStorage)) {
          const success = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${
              JSON.parse(favoriteCitiesFromStorage)[x]?.lat
            }&lon=${
              JSON.parse(favoriteCitiesFromStorage)[x]?.lon
            }&units=metric&exclude=minutely,hourly,alerts&appid=${APIkey}`
          );

          const response = await success.json();

          let address = await Location.reverseGeocodeAsync({
            latitude: parseFloat(JSON.parse(favoriteCitiesFromStorage)[x].lat),
            longitude: parseFloat(JSON.parse(favoriteCitiesFromStorage)[x].lon),
          });

          response.city = address[0]?.city;

          arr.push(response);
        }

        setFavoriteCities(arr);

        await AsyncStorage.setItem("favoriteCities", JSON.stringify(arr));
      }
    } else {
      setFavoriteCities(JSON.parse(favoriteCitiesFromStorage));
    }
  };

  const navigateToDetail = async () => {
    if (weatherForecastForCityResponse?.current) {
      let address = await Location.reverseGeocodeAsync({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      });
      weatherForecastForCityResponse.city = address[0]?.city;
      setShowSwiper(false);
      navigation.navigate("InfoWeather", {
        weatherDetails: weatherForecastForCityResponse,
      });
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
          ref={ref}
          debounce={1000}
          minLength={2}
          autoFocus={false}
          placeholder="Search cities"
          onSelectItem={(data: any) => {
            setLat(data.latitude);
            setLon(data.longitude);
            dispatch(
              getWeatherInformationForCity(data.latitude, data.longitude)
            );
            ref.current.state.value = "";
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
            <View style={styles.bottomMargin} />
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
      <View style={styles.topMarginView} />
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
  bottomMargin: { marginBottom: 100, marginTop: 100 },
});

export default FavoriteCitiesWeatherScreen;
