import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

import PlayerButton from "../components/PlayerButton";
import PlayerMenuBottom from "../components/PlayerMenuBottom";
import { humanReadableDuration } from "../services/utils";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

const Player = ({ sound, book, modalVisible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [duration, setDuration] = useState({});
  const [volume, setVolume] = useState(1);

  const toSeconds = (msDuration) => {
    const s = Math.floor(msDuration / 1000);
    return s;
  };

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

  const handlePlaybackPosition = async (value) => {
    if (playbackInstance !== null) {
      setCurrentPosition(value);
      await playbackInstance.setPositionAsync(value);
    }
  };

  const handleSpeedChange = async (value) => {
    setPlaybackSpeed(value);
    if (playbackInstance !== null) {
      await playbackInstance.setRateAsync(value);
    }
  };

  const handlePrevious = () => {};
  const handleNext = () => {};
  const handleVolume = () => {};

  useEffect(() => {
    if (soundObj?.isLoaded) {
      playbackInstance.setOnPlaybackStatusUpdate((status) => {
        setDuration({
          positionMillis: status.positionMillis,
          durationMillis: status.durationMillis,
        });
        const position = toSeconds(status.positionMillis);
        const durationSec = toSeconds(status.durationMillis);
        setCurrentPosition(position / durationSec);
      });
    }
  }, [soundObj, playbackInstance]);

  useEffect(() => {
    return playbackInstance
      ? () => {
          console.log("Unloading Sound");
          playbackInstance.unloadAsync();
        }
      : undefined;
  }, [playbackInstance]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.audioCountContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>From Playlist: </Text>
            <Text>{book.playlist}</Text>
          </View>
          <Text style={styles.cancel}>
            <Feather name="x" size={24} color="black" onPress={modalVisible} />
          </Text>
        </View>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={250}
            color={isPlaying ? colors.secondary : colors.N10}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.audioTitle}>
              {book.title}
            </Text>
            <Text numberOfLines={1} style={styles.audioReciter}>
              Reciter: {book.audio.reciter}
            </Text>
          </View>
          <View style={styles.timeline}>
            <View style={styles.durationContainer}>
              <Text style={styles.duration}>
                {duration.positionMillis
                  ? humanReadableDuration(duration.positionMillis)
                  : "00:00"}
              </Text>
              <Text style={styles.duration}>
                {duration.durationMillis
                  ? humanReadableDuration(duration.durationMillis)
                  : "00:00"}
              </Text>
            </View>
            <Slider
              style={{ height: 40 }}
              minimumValue={0}
              maximumValue={1}
              onValueChange={(value) => handlePlaybackPosition(value)}
              value={currentPosition}
              minimumTrackTintColor={colors.P50}
              maximumTrackTintColor={colors.P10}
              onSlidingStart={async () => {}}
              onSlidingComplete={async (value) => {}}
            />
          </View>
          <View style={styles.audioControllers}>
            <Feather name="volume-2" size={24} color={colors.N80} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 25,
              }}
            >
              <PlayerButton
                iconType="PREV"
                onPress={handlePrevious}
                iconColor={colors.N80}
              />
              <PlayerButton
                onPress={handleAudioPress}
                style={{ marginHorizontal: 20 }}
                iconSize={55}
                iconType={!isPlaying ? "PAUSE" : "PLAY"}
              />
              <PlayerButton
                iconType="NEXT"
                onPress={handleNext}
                iconColor={colors.N80}
              />
            </View>
            <Ionicons name="share-outline" size={24} color={colors.N80} />
          </View>
          <PlayerMenuBottom />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width,
  },
  audioCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    textAlign: "right",
    color: "blue",
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeline: {
    paddingVertical: 10,
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  duration: {
    color: colors.P20,
    fontSize: 12,
  },
  titleContainer: { marginVertical: 10 },
  audioTitle: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "500",
  },
  audioReciter: {
    color: colors.black,
    opacity: 0.5,
    fontSize: 16,
    marginTop: 4,
  },
  audioControllers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 17,
  },
});

export default Player;
