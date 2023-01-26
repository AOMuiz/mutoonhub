import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Slider } from "react-native";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlayerButton from "../components/PlayerButton";
import { Audio } from "expo-av";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

const Player = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleAudioPress = async () => {
    if (soundObj === null) {
      console.log("Loading Sound");
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync(
        { uri: sound },
        { shouldPlay: true }
      );
      console.log({ status });
      setPlaybackInstance(playbackObj);
      setSoundObj(status);
      setIsPlaying(status.isPlaying);
      console.log({ status });
      return;
    }

    //pause
    if (soundObj.isLoaded && soundObj.isPlaying) {
      console.log("already playing");
      const status = await playbackInstance.pauseAsync();
      setSoundObj(status);
      setIsPlaying(status.isPlaying);
      console.log({ status });
      return;
    }

    //resume
    if (soundObj.isLoaded && !soundObj.isPlaying) {
      console.log("resume");
      const status = await playbackInstance.playAsync();
      setSoundObj(status);
      setIsPlaying(status.isPlaying);
      return;
    }
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>From Playlist: </Text>
            <Text>Mutoon Taalib-l-Ilm</Text>
          </View>
          <Text style={styles.audioCount}>10/40</Text>
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
            Sharhu Sunnah
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
          >
            <Text>20:10</Text>
            <Text>10:05</Text>
          </View>
          {/* <Slider
            style={{ width: width, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            // onValueChange={handlePlaybackPosition}
            value={currentPosition}
            minimumTrackTintColor={"pink"}
            maximumTrackTintColor={"purple"}
            onValueChange={(value) => {}}
            onSlidingStart={async () => {}}
            onSlidingComplete={async (value) => {}}
          />
          <Slider
            minimumValue={0}
            maximumValue={1}
            onValueChange={handleVolume}
            value={volume}
          /> */}
          <View style={styles.audioControllers}>
            <PlayerButton iconType="PREV" onPress={handlePrevious} />
            <PlayerButton
              onPress={handleAudioPress}
              style={{ marginHorizontal: 25 }}
              iconType={isPlaying ? "PAUSE" : "PLAY"}
            />
            <PlayerButton iconType="NEXT" onPress={handleNext} />
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
    paddingHorizontal: 15,
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
