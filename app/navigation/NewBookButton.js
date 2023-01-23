import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const NewBookButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="plus-circle" color={"white"} size={30} />
      </View>
    </Pressable>
  );
};

export default NewBookButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: "white",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 5,
    bottom: 20,
    width: 70,
    height: 70,
  },
});
