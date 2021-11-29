import moment from "moment";
import React, { ReactElement } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";

export interface ListItemProps {
  temperature: string;
  city: string;
  background: any;
}

function ListItem({
  temperature,
  city,
  background,
}: ListItemProps): ReactElement {
  return (
    <TouchableOpacity
      style={{
        height: 150,
      }}
    >
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="stretch"
        source={background}
      >
        <View>
          <Text style={styles.hourText}>{moment().format("HH:mm")}</Text>
          <Text style={styles.cityText}>{city}</Text>
        </View>
        <View>
          <Text style={styles.temperatureText}>{temperature}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  imageBackground: {
    height: 150,
    opacity: 0.93,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    flexDirection: "row",
  },
  temperatureText: {
    color: "white",
    fontWeight: "500",
    fontSize: 37,
    opacity: 1,
    marginRight: 21,
  },
  cityText: {
    color: "white",
    fontWeight: "500",
    fontSize: 27,
    opacity: 1,
    marginLeft: 21,
  },
  hourText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    opacity: 1,
    marginLeft: 21,
  },
});
