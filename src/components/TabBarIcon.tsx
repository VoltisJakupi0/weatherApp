import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

export default function TabBarIcon(props: any) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? "#A4DAFF" : "#ccc"}
    />
  );
}
