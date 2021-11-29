import React, { ReactElement, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import SearchInput from "../components/SearchInput";
import moment from "moment";
import { ListItemProps } from "../components/ListItem";
import List from "../components/List";

interface WeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const data: ListItemProps[] = [
  {
    temperature: "2°C",
    background: require("../../assets/images/rainy.jpeg"),
    city: "Prishtina",
  },
  {
    temperature: "8°C",
    background: require("../../assets/images/sunnyday.jpeg"),
    city: "London",
  },
  {
    temperature: "-4°C",
    background: require("../../assets/images/snow.jpeg"),
    city: "Budapest",
  },
  {
    temperature: "12°C",
    background: require("../../assets/images/cloudy.jpeg"),
    city: "Tirana",
  },
];

function WeatherScreen(props: WeatherScreenProps): ReactElement {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <View style={styles.mainView}>
      <SearchInput
        placeholder={"Search Country"}
        value={searchValue}
        onChangeText={(value: string) => handleChangeSearchValue(value)}
      />

      <View style={{ marginTop: 10 }} />

      <List data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 65,
  },
});

export default WeatherScreen;
