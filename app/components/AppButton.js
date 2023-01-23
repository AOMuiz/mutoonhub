import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  textStyle,
  buttonStyle,
  Icon,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, buttonStyle]}
      onPress={onPress}
    >
      {Icon && Icon}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    flexDirection: "row",
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default AppButton;
