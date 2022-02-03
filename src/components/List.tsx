import React, { useContext } from "react";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import ListItem, { ListItemType } from "./ListItem";
import { View } from "react-native";
import { WeatherContext } from "../context";
interface ListProps {
  data: ListItemType[] | any;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function List({ data, navigation }: ListProps): any {
  const [, setShowSwiper] = useContext<any>(WeatherContext);
  return data?.map((item: any, key: number) => {
    const mainWeather = item?.current?.weather[0]?.main;
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

    console.log("item", item);
    return (
      <View key={key}>
        <ListItem
          onPress={() => {
            setShowSwiper(true);
            navigation.navigate("InfoWeather", { weatherDetails: item });
          }}
          background={backgroundImage}
          city={item?.city}
          temperature={Math.round(item.current?.temp).toString()}
        />
      </View>
    );
  });
}

export default List;
