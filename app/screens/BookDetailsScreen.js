import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Audio } from "expo-av";
// import TrackPlayer, { State } from "react-native-track-player";

const BookDetailsScreen = ({ route, navigation }) => {
  const book = route.params;

  const [sound, setSound] = useState();

  // const playSound = async () => {
  //   console.log("Loading Sound");
  //   const { sound: playbackObject } = await Audio.Sound.createAsync(
  //     {
  //       uri: book.audioUri,
  //     },
  //     { shouldPlay: true }
  //   );
  //   setSound(playbackObject);

  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // };

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  // const handleAudioPress = () => {
  //   const playbackObj = new Audio.Sound();
  //   playbackObj.loadAsync();
  // };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={book.image} />
          <AppText style={styles.title}>{book.title}</AppText>
          <AppText style={styles.author}>By - {book.author}</AppText>
        </View>
        <View style={styles.actions}>
          <AppButton
            title={"Play Audio"}
            // onPress={playSound}
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
