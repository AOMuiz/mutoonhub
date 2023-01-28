import React, { useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Player from "./PlayerScreen";

const BookDetailsScreen = ({ route, navigation }) => {
  const book = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Player
            sound={book.audio}
            book={book}
            modalVisible={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={book.image} />
          <AppText style={styles.title}>{book.title}</AppText>
          <AppText style={styles.author}>By - {book.author}</AppText>
        </View>
        <View style={styles.actions}>
          <AppButton
            title={"Play Audio"}
            onPress={() => setModalVisible(true)}
            Icon={
              <MaterialCommunityIcons
                name="play-circle"
                size={20}
                color={colors.white}
              />
            }
            buttonStyle={styles.action}
          />
          <AppButton
            title={"Read Text"}
            buttonStyle={styles.action}
            onPress={() =>
              navigation.navigate("ReadBook", {
                bookUri: book.bookUri,
                title: book.title,
              })
            }
            color={"white"}
            Icon={
              <MaterialCommunityIcons
                name="book"
                size={20}
                color={colors.primary}
              />
            }
            textStyle={{ color: colors.primary }}
          />
        </View>
        <View style={styles.summaryContainer}>
          <AppText style={styles.summaryTitle}>Summary</AppText>
          <Text style={styles.summary}>{book.summary}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 35,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  summaryContainer: { marginBottom: 20 },
  title: { fontWeight: "500", fontSize: 20, marginTop: 10 },
  author: { fontWeight: "400", fontSize: 16, color: colors.medium },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  action: { elevation: 5 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
    fontWeight: "600",
  },
  summaryTitle: {
    color: colors.primary,
    marginVertical: 5,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "600",
  },
  summary: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.medium,
    lineHeight: 25,
  },
});
