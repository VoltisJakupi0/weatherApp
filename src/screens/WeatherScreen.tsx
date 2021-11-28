import React, { ReactElement, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import SearchInput from "../components/SearchInput";

interface WeatherScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function WeatherScreen(props: WeatherScreenProps): ReactElement {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <View>
      <SearchInput
        placeholder={"Search Weather"}
        value={searchValue}
        onChangeText={(value: string) => handleChangeSearchValue(value)}
      />
      <Text>Home</Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("InfoWeather")}
      >
        <Text>Go to Info Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WeatherScreen;
