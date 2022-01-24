import axios from "axios";
import { Alert } from "react-native";
import { APIkey } from "../constants/apiKey";

export const getWeatherInformationForCity = (lat: string, lon: string) => {
  return async (dispatch: any) => {
    const onSuccess = async (success: any) => {
      const json = await success.json();
      dispatch({
        type: "GET_WEATHER_INFORMATIONS",
        payload: json,
      });
      return json;
    };

    try {
      const success = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${APIkey}`
      );
      return onSuccess(success);
    } catch (error: any) {
      Alert.alert(
        error?.message
          ? error.message
          : "Error while callin request for weather api!",
        "",
        []
      );
    }
  };
};
