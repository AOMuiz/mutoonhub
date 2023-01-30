import { StyleSheet, Text, View } from "react-native";
import Accordion from "../components/Accordion";

const BooksScreen = () => {
  return (
    <View style={styles.container}>
      <Accordion />
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
