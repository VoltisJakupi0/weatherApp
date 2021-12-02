import React, { ReactElement } from "react";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import ListItem, { ListItemType } from "./ListItem";
interface ListProps {
  data: ListItemType[];
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function List({ data, navigation }: ListProps): any {
  return data.map((item: ListItemType) => {
    return (
      <ListItem
        onPress={() => navigation.navigate("InfoWeather")}
        background={item.background}
        city={item.city}
        temperature={item.temperature}
      />
    );
  });
}

export default List;
