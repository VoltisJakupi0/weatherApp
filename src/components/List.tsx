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
  const [, setCity] = useContext<any>(WeatherContext);
  return data?.map((item: any, key: number) => {
    return (
      <View key={key}>
        <ListItem
          onPress={() => {
            setCity(item?.city);
            navigation.navigate("InfoWeather", { weatherDetails: item });
          }}
          background={require("../../assets/images/sunnyday.jpeg")}
          city={item?.city}
          temperature={Math.round(item.current?.temp).toString()}
        />
      </View>
    );
  });
}

export default List;
