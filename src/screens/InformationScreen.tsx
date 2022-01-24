import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";

function InformationScreen(): ReactElement {
  return (
    <View>
      <View style={styles.centerView}>
        <Text style={styles.weatherAppInformationText}>
          Weather App Information
        </Text>
      </View>
      <View style={styles.informationView}>
        <Text>
          This is an informational weather app made for Riinvest Institution.
          The weather information is based on OPEN WEATHER api which is free
          also the cities api is based on RAPID which is also free.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  informationView: {
    borderRadius: 10,
    padding: 10,
    margin: 20,
    marginTop: 40,
    backgroundColor: "lightgrey",
  },
  weatherAppInformationText: {
    fontSize: 20,
    fontWeight: "500",
  },
  centerView: {
    marginTop: 90,
    alignItems: "center",
  },
});

export default InformationScreen;
