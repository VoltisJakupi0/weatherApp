import React, { ReactElement, useContext, useEffect, useState } from "react";
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
import { WeatherContext } from "../context";
import Swiper from "../components/Swiper";

interface DetailCityWeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  route: any;
}

function DetailCityWeatherScreen({
  navigation,
  route,
}: DetailCityWeatherScreenProps): ReactElement {
  const [tab, setTab] = useState(1);
  const [favoriteCities, setFavoriteCities] = useState<any>();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [weatherDetails, setWeatherDetails] = useState<any>();
  const [showSwiper] = useContext<any>(WeatherContext);

  useEffect(() => {
    if (route.params) {
      setWeatherDetails(route.params?.weatherDetails);
      setFavoriteByDefault();
    }
  }, [route.params, weatherDetails]);

  const setFavoriteByDefault = async () => {
    var favoriteCities: any = await AsyncStorage.getItem("favoriteCities");

    setFavoriteCities(JSON.parse(favoriteCities));

    const index = JSON.parse(favoriteCities).findIndex(
      (item: any) => item.city == weatherDetails?.city
    );

    setTab(index);

    const isFavorite = index == -1 ? false : true;

    if (isFavorite) {
      setFavorite(true);
    }
  };

  const handleFavorite = async () => {
    var favoriteCities: any = await AsyncStorage.getItem("favoriteCities");
    if (favoriteCities == undefined) {
      var favoriteCities: any = await AsyncStorage.setItem(
        "favoriteCities",
        JSON.stringify("[]")
      );
    }

    var arr: any = JSON.parse(favoriteCities);

    if (favorite) {
      const result = arr?.filter((x: any) => x.city !== weatherDetails.city);

      await AsyncStorage.setItem("favoriteCities", JSON.stringify(result));
    } else {
      arr?.push(weatherDetails);
      await AsyncStorage.setItem("favoriteCities", JSON.stringify(arr));
    }

    setFavorite(!favorite);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const WeatherInfoContent = ({
    backgroundImage,
    city,
    description,
    temperature,
    high,
    low,
    weatherInfo,
  }: any): ReactElement => {
    return (
      <ScrollView>
        <ImageBackground style={styles.imageWrapper} source={backgroundImage}>
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
            <Text style={styles.cityText}>{city}</Text>
            <Text style={styles.weatherText}>{description}</Text>
            <Text style={styles.temperatureText}>{temperature}°</Text>
            <Text style={styles.highLowInfo}>
              HIGH: {high}° LOW: {low}°
            </Text>
          </View>

          <View style={styles.weatherDailyInfoCardsView}>
            <ScrollView horizontal>
              {weatherInfo?.daily?.map((item: any, key: any) => {
                return (
                  <WeatherDailyInfoCard
                    day={
                      key == 0 ? "Cur" : moment().add(key, "day").format("DD")
                    }
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
      </ScrollView>
    );
  };

  const ShowSwiperContent = (): ReactElement => {
    return (
      <Swiper
        tab={tab}
        numberOfSlides={favoriteCities?.length ?? 3}
        onIndexChange={(index: any) => {
          let indexNumber = index;
          setTab(indexNumber);
        }}
      >
        {favoriteCities?.length > 0 &&
          favoriteCities?.map((x: any, key: any) => {
            const city = x?.city;
            const mainWeather = x?.current?.weather[0].main;
            const description = capitalize(x?.current?.weather[0].description);
            const temperature = Math.round(x?.current?.temp);
            const high = Math.round(x?.daily[0]?.temp?.max);
            const low = Math.round(x?.daily[0]?.temp?.min);
            const backgroundImage =
              mainWeather == "Rainy"
                ? require("../../assets/images/rainy.jpeg")
                : mainWeather == "Snow"
                ? require("../../assets/images/snow.jpeg")
                : mainWeather == "Sunny"
                ? require("../../assets/images/sunnyday.jpeg")
                : mainWeather == "Clear"
                ? require("../../assets/images/clear.jpeg")
                : require("../../assets/images/cloudy.jpeg");

            if (key !== tab) {
              return <View />;
            }

            return (
              <WeatherInfoContent
                weatherInfo={x}
                city={city}
                backgroundImage={backgroundImage}
                temperature={temperature}
                description={description}
                high={high}
                low={low}
              />
            );
          })}
      </Swiper>
    );
  };

  const ShowOneCityDetailWeather = (): ReactElement => {
    const city = weatherDetails?.city;
    const mainWeather = weatherDetails?.current?.weather[0].main;
    const description = capitalize(
      weatherDetails?.current?.weather[0].description
    );
    const temperature = Math.round(weatherDetails?.current?.temp);
    const high = Math.round(weatherDetails?.daily[0]?.temp?.max);
    const low = Math.round(weatherDetails?.daily[0]?.temp?.min);
    const backgroundImage =
      mainWeather == "Rainy"
        ? require("../../assets/images/rainy.jpeg")
        : mainWeather == "Snow"
        ? require("../../assets/images/snow.jpeg")
        : mainWeather == "Sunny"
        ? require("../../assets/images/sunnyday.jpeg")
        : mainWeather == "Clear"
        ? require("../../assets/images/clear.jpeg")
        : require("../../assets/images/cloudy.jpeg");
    return (
      <WeatherInfoContent
        weatherInfo={weatherDetails}
        city={city}
        backgroundImage={backgroundImage}
        temperature={temperature}
        description={description}
        high={high}
        low={low}
      />
    );
  };
  return showSwiper ? <ShowSwiperContent /> : <ShowOneCityDetailWeather />;
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
