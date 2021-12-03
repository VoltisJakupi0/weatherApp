import React, { ReactElement, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import SearchInput from "../components/SearchInput";
import { ListItemType } from "../components/ListItem";
import List from "../components/List";

interface WeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const data: ListItemType[] = [
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

function FavoriteCitiesWeatherScreen({
  navigation,
}: WeatherScreenProps): ReactElement {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <View style={styles.mainView}>
      <SearchInput
        placeholder={"Search City"}
        value={searchValue}
        onChangeText={(value: string) => handleChangeSearchValue(value)}
      />

      <View style={styles.topMarginView} />
      <Text style={styles.favoriteCityText}>Your favorite cities</Text>
      <ScrollView>
        <List navigation={navigation} data={data} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 65,
    backgroundColor: "white",
  },
  topMarginView: { marginTop: 40 },
  favoriteCityText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 13,
    marginBottom: 8,
    color: "grey",
  },
});

export default FavoriteCitiesWeatherScreen;
