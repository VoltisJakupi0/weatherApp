import React, { ReactElement } from "react";
import { TextInput } from "react-native";

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
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

export default SearchInput;
