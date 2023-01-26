import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import Player from "./PlayerScreen";
// import TrackPlayer, { State } from "react-native-track-player";

const BookDetailsScreen = ({ route, navigation }) => {
  const book = route.params;
  const [soundObj, setSoundObj] = useState();
  const [statusObj, setStatusObj] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const playSound = async () => {
    //first time play
    if (statusObj === null) {
      console.log("Loading Sound");
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        {
          uri: book.audioUri,
        },
        { shouldPlay: true }
      );
      setSoundObj(playbackObject);
      console.log({ playbackObject });
      console.log("Playing Sound");
      console.log({ soundObj });
      const status = await playbackObject.playAsync();
      setStatusObj(status);
      console.log({ status });
      return;
    }

    //pause
    if (statusObj.isLoaded && statusObj.isPlaying) {
      console.log("already playing");
      const status = await soundObj.pauseAsync();
      setSoundObj(status);
      console.log({ soundObj });
      console.log({ statusObj });
      return;
    }

    //resume
    if (statusObj.isLoaded && !statusObj.isPlaying) {
      console.log("resume");
    }
  };

  useEffect(() => {
    return soundObj
      ? () => {
          console.log("Unloading Sound");
          soundObj.unloadAsync();
        }
      : undefined;
  }, [soundObj]);

  return (
    <Screen>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Player sound={book.audioUri} />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
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
            onPress={playSound}
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
            onPress={() => navigation.navigate("ReadBook", book.bookUri)}
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
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
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
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#0002",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  summaryContainer: { marginVertical: 10 },
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
  summaryTitle: { color: colors.primary, marginVertical: 5 },
  summary: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.medium,
    lineHeight: 25,
  },
});
