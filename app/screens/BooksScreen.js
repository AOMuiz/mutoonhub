import { StyleSheet, Text, View } from "react-native";
import Accordion from "../components/Accordion";

const BooksScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Accordion />
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({});
