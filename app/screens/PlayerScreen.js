import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Slider } from "react-native";
import Screen from "../components/Screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import PlayerButton from "../components/PlayerButton";
import { Audio } from "expo-av";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

const Player = ({ sound, book, modalVisible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleAudioPress = async () => {
    // const playbackObj = new Audio.Sound();
    if (soundObj === null) {
      console.log("Loading Sound");

      try {
        const { sound: playbackObj, status } = await Audio.Sound.createAsync(
          { uri: sound.uri },
          { shouldPlay: true }
        );
        // const status = await playbackObj.loadAsync(
        //   { uri: sound.uri },
        //   { shouldPlay: true }
        // );
        setPlaybackInstance(playbackObj);
        setSoundObj(status);
        setIsPlaying(true);
        console.log({ isPlaying });
        console.log({ status });
        console.log({ soundObj });
      } catch (error) {
        console.log({ error });
      }
      return;
    }

    //pause
    if (soundObj.isLoaded && soundObj.isPlaying) {
      console.log("already playing");
      try {
        const status = await playbackInstance.pauseAsync();
        setSoundObj(status);
        setIsPlaying(status.isPlaying);
        console.log({ status });
        console.log({ isPlaying });
        console.log({ soundObj });
      } catch (error) {
        console.log(error);
      }
      return;
    }

    //resume
    if (soundObj.isLoaded && !soundObj.isPlaying) {
      console.log("resume");
      const status = await playbackInstance.playAsync();
      setSoundObj(status);
      setIsPlaying(status.isPlaying);
      console.log({ isPlaying });
      return;
    }
  };

  const handlePlaybackPosition = (value) => {
    setCurrentPosition(value);
    soundObj.setPositionAsync(value);
  };

  const handlePrevious = () => {};
  const handleNext = () => {};
  const handleVolume = () => {};

  useEffect(() => {
    return playbackInstance
      ? () => {
          console.log("Unloading Sound");
          playbackInstance.unloadAsync();
        }
      : undefined;
  }, [playbackInstance]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.audioCountContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>From Playlist: </Text>
            <Text>{book.playlist}</Text>
          </View>
          <Text style={styles.audioCount}>
            <Feather name="x" size={24} color="black" onPress={modalVisible} />
          </Text>
        </View>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={colors.secondary}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {book.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text>10:05</Text>
            <Text>20:10</Text>
          </View>
          <Slider
            style={{ width: width, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            onValueChange={handlePlaybackPosition}
            value={currentPosition}
            minimumTrackTintColor={colors.P100}
            maximumTrackTintColor={"black"}
            // onValueChange={(value) => {}}
            onSlidingStart={async () => {}}
            onSlidingComplete={async (value) => {}}
          />
          <View style={styles.audioControllers}>
            <PlayerButton
              iconType="PREV"
              onPress={handlePrevious}
              size={30}
              iconColor={colors.mono3}
            />
            <PlayerButton
              onPress={handleAudioPress}
              style={{ marginHorizontal: 25 }}
              iconType={!isPlaying ? "PAUSE" : "PLAY"}
            />
            <PlayerButton
              iconType="NEXT"
              onPress={handleNext}
              size={30}
              iconColor={colors.mono3}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  audioControllers: {
    width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  audioCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 13,
  },
  container: {
    flex: 1,
  },
  audioCount: {
    textAlign: "right",
    color: "blue",
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioTitle: {
    fontSize: 16,
    color: colors.primary,
    padding: 15,
  },
});

export default Player;
