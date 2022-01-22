import moment from "moment";
import React, { ReactElement, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Animated,
} from "react-native";

export interface ListItemType {
  temperature: string;
  city: string;
  background: any;
}

export interface ListItemProps extends ListItemType {
  onPress?: () => void;
}

function ListItem({
  temperature,
  city,
  background,
  onPress,
}: ListItemProps): ReactElement {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const now = moment().format("HH:mm");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <TouchableOpacity style={styles.mainButton} onPress={onPress}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="stretch"
          source={background}
        >
          <View>
            <Text style={styles.hourText}>{now}</Text>
            <Text style={styles.cityText}>{city}</Text>
          </View>
          <View>
            <Text style={styles.temperatureText}>{temperature}°</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  mainButton: {
    height: 150,
  },
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
