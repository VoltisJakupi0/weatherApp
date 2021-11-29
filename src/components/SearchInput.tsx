import React, { ReactElement } from "react";
import { TextInput, Image, View, StyleSheet } from "react-native";

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}

function SearchInput({
  value,
  placeholder,
  onChangeText,
}: SearchInputProps): ReactElement {
  return (
    <View style={styles.mainView}>
      <TextInput
        style={{ fontSize: 15 }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <Image
        style={{ width: 20, height: 20 }}
        source={require("../../assets/images/search.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: 48,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export default SearchInput;
