import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Slider } from "react-native";
import Screen from "../components/Screen";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import PlayerButton from "../components/PlayerButton";
import { Audio } from "expo-av";
import colors from "../config/colors";
import { humanReadableDuration } from "../services/utils";

const { width } = Dimensions.get("window");

const Player = ({ sound, book, modalVisible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState({});
  const [volume, setVolume] = useState(1);

  const handleAudioPress = async () => {
    if (soundObj === null) {
      console.log("Loading Sound");
      try {
        const { sound: playbackObj, status } = await Audio.Sound.createAsync(
          { uri: sound.uri },
          { shouldPlay: true }
        );
        setPlaybackInstance(playbackObj);
        setSoundObj(status);
        setDuration({
          positionMillis: status.positionMillis,
          durationMillis: status.durationMillis,
        });
        setIsPlaying(status.isPlaying && status.isBuffering);
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
    playbackInstance.setPositionAsync(value);
  };

  const handlePrevious = () => {};
  const handleNext = () => {};
  const handleVolume = () => {};

  useEffect(() => {
    if (soundObj?.isLoaded) {
      playbackInstance.setOnPlaybackStatusUpdate((status) =>
        setDuration({
          positionMillis: status.positionMillis,
          durationMillis: status.durationMillis,
        })
      );
    }
  }, [soundObj]);

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
            <Text>
              {duration.positionMillis
                ? humanReadableDuration(duration.positionMillis)
                : "00:00"}
            </Text>
            <Text>
              {duration.durationMillis
                ? humanReadableDuration(duration.durationMillis)
                : "00:00"}
            </Text>
          </View>
          <Slider
            style={{ width: width, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            onValueChange={(value) => handlePlaybackPosition(value)}
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
