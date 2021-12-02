import React from "react";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import ListItem, { ListItemType } from "./ListItem";
import { View } from "react-native";
interface ListProps {
  data: ListItemType[];
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function List({ data, navigation }: ListProps): any {
  return data.map((item: ListItemType, key: number) => {
    return (
      <View key={key}>
        <ListItem
          onPress={() => navigation.navigate("InfoWeather")}
          background={item.background}
          city={item.city}
          temperature={item.temperature}
        />
      </View>
    );
  });
}

export default List;
