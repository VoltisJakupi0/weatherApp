import React, { ReactElement, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import WeatherDailyInfoCard from "../components/WeatherDailyInfoCard";
import WeatherWeekDayInfoCard from "../components/WeatherWeekDayInfoCard";
interface DetailCityWeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function DetailCityWeatherScreen({
  navigation,
}: DetailCityWeatherScreenProps): ReactElement {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavorite = () => {
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
          <Text style={styles.cityText}>Prishtina</Text>
          <Text style={styles.weatherText}>Rainy</Text>
          <Text style={styles.temperatureText}>2°</Text>
          <Text style={styles.highLowInfo}>HIGH: 10° LOW: -1°</Text>
        </View>

        <View style={styles.weatherDailyInfoCardsView}>
          <ScrollView horizontal>
            <WeatherDailyInfoCard day="Now" temperature="2°" />
            <WeatherDailyInfoCard day="4" temperature="12°" />
            <WeatherDailyInfoCard day="5" temperature="10°" />
            <WeatherDailyInfoCard day="6" temperature="9°" />
            <WeatherDailyInfoCard day="7" temperature="12°" />
            <WeatherDailyInfoCard day="8" temperature="13°" />
            <WeatherDailyInfoCard day="9" temperature="7°" />
            <WeatherDailyInfoCard day="10" temperature="8°" />
            <WeatherDailyInfoCard day="11" temperature="5°" />
            <WeatherDailyInfoCard day="12" temperature="5°" />
            <WeatherDailyInfoCard day="13" temperature="8°" />
            <WeatherDailyInfoCard day="14" temperature="3°" />
            <WeatherDailyInfoCard day="15" temperature="3°" />
            <WeatherDailyInfoCard day="16" temperature="4°" />
            <WeatherDailyInfoCard day="17" temperature="5°" />
          </ScrollView>
        </View>

        <View style={styles.weatherWeekDayInfoCardsView}>
          <ScrollView>
            <WeatherWeekDayInfoCard day="Monday" temperature="2°" />
            <WeatherWeekDayInfoCard day="Tuesday" temperature="8°" />
            <WeatherWeekDayInfoCard day="Wednseday" temperature="7°" />
            <WeatherWeekDayInfoCard day="Thursday" temperature="3°" />
            <WeatherWeekDayInfoCard day="Friday" temperature="2°" />
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
  },
});

export default DetailCityWeatherScreen;
