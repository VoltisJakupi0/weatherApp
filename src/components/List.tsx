import React from "react";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import ListItem, { ListItemType } from "./ListItem";
import { View } from "react-native";
interface ListProps {
  data: ListItemType[] | any;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function List({ data, navigation }: ListProps): any {
  return data?.map((item: any, key: number) => {
    return (
      <View key={key}>
        <ListItem
          onPress={() =>
            navigation.navigate("InfoWeather", { weatherDetails: item })
          }
          background={require("../../assets/images/sunnyday.jpeg")}
          city={item?.timezone.split("/")[1]}
          temperature={Math.round(item.current?.temp).toString()}
        />
      </View>
    );
  });
}

export default List;
