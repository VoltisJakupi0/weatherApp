import React, { ReactElement, useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import WeatherDailyInfoCard from "../components/WeatherDailyInfoCard";
import WeatherWeekDayInfoCard from "../components/WeatherWeekDayInfoCard";
import moment from "moment";
import { capitalize } from "../helpers/capitalize";

interface DetailCityWeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
}

function DetailCityWeatherScreen({
  navigation,
  route,
}: DetailCityWeatherScreenProps): ReactElement {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [weatherDetails, setWeatherDetails] = useState<any>();

  useEffect(() => {
    if (route.params) {
      setWeatherDetails(route.params?.weatherDetails);
      setFavoriteByDefault();
    }
  }, [route.params, weatherDetails]);

  const setFavoriteByDefault = async () => {
    var favoriteCities: any = await AsyncStorage.getItem("favoriteCities");

    const isFavorite =
      JSON.parse(favoriteCities).findIndex(
        (item: any) => item.timezone == weatherDetails?.timezone
      ) == -1
        ? false
        : true;

    if (isFavorite) {
      setFavorite(true);
    }

    console.log(isFavorite);
  };

  const handleFavorite = async () => {
    var favoriteCities: any = await AsyncStorage.getItem("favoriteCities");
    if (favoriteCities == undefined) {
      var favoriteCities: any = await AsyncStorage.setItem(
        "favoriteCities",
        JSON.stringify([])
      );
    }

    var arr = JSON.parse(favoriteCities);

    if (favorite) {
      const result = arr?.filter(
        (x: any) => x.timezone !== weatherDetails.timezone
      );

      await AsyncStorage.setItem("favoriteCities", JSON.stringify(result));
    } else {
      arr.push(weatherDetails);
      await AsyncStorage.setItem("favoriteCities", JSON.stringify(arr));
    }

    setFavorite(!favorite);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageWrapper}
        source={require("../../assets/images/rainyinfo.jpeg")}
      >
        <View style={styles.headerView}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={require("../../assets/images/leftarrow.png")}
              style={styles.leftArrowImage}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavorite}>
            <Image
              source={
                favorite
                  ? require("../../assets/images/staricon.png")
                  : require("../../assets/images/starout.png")
              }
              style={styles.starImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingInfoView}>
          <Text style={styles.cityText}>
            {weatherDetails?.timezone.split("/")[1]}
          </Text>
          <Text style={styles.weatherText}>
            {capitalize(weatherDetails?.current?.weather[0].description)}
          </Text>
          <Text style={styles.temperatureText}>
            {Math.round(weatherDetails?.current?.temp)}°
          </Text>
          <Text style={styles.highLowInfo}>
            HIGH: {Math.round(weatherDetails?.daily[0]?.temp?.max)}° LOW:{" "}
            {Math.round(weatherDetails?.daily[0]?.temp?.min)}°
          </Text>
        </View>

        <View style={styles.weatherDailyInfoCardsView}>
          <ScrollView horizontal>
            {weatherDetails?.daily?.map((item: any, key: any) => {
              return (
                <WeatherDailyInfoCard
                  day={key == 0 ? "Cur" : moment().add(key, "day").format("DD")}
                  temperature={Math.round(item?.temp?.day) + "°"}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.weatherWeekDayInfoCardsView}>
          <ScrollView style={{ marginBottom: 100 }}>
            {weatherDetails?.daily?.map((item: any, key: any) => {
              return (
                <WeatherWeekDayInfoCard
                  day={moment().add(key, "day").format("dddd")}
                  temperature={Math.round(item?.temp?.day) + "°"}
                />
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cityText: { color: "white", fontSize: 38, fontWeight: "500" },
  weatherText: {
    color: "white",
    fontSize: 22,
    paddingTop: 5,
    fontWeight: "500",
  },
  temperatureText: {
    color: "white",
    fontSize: 90,
    fontWeight: "200",
    paddingTop: 5,
  },
  highLowInfo: {
    color: "white",
    fontSize: 16,
    paddingTop: 5,
    fontWeight: "500",
  },
  imageWrapper: { width: "100%", height: "100%", opacity: 0.9 },
  headerView: {
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 55,
    flexDirection: "row",
  },
  leftArrowImage: { width: 30, height: 30, tintColor: "white" },
  starImage: { width: 30, height: 30, tintColor: "white" },
  headingInfoView: { marginTop: 60, alignItems: "center" },
  weatherDailyInfoCardsView: {
    marginTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    height: 100,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  weatherWeekDayInfoCardsView: {
    marginTop: 20,
    height: 300,
  },
});

export default DetailCityWeatherScreen;
