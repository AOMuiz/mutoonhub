import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { MUTOONS } from "../../books";
import { Playlist } from "../../categories";
import colors from "../config/colors";

const Accordion = () => {
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [items, setItems] = useState([]);

  const togglePlaylist = (playlist) => {
    setActivePlaylist(activePlaylist === playlist ? null : playlist);
  };

  // useEffect(() => {
  //   const filteredItems = MUTOONS.filter((i) =>
  //     i.playlist.includes(activePlaylist)
  //   );
  //   setItems(filteredItems);
  // }, [activePlaylist]);

  // const handleAccordion = (playlist) => {
  //   if (activePlaylist === playlist) {
  //     setActivePlaylist(null);
  //   } else {
  //     setActivePlaylist(playlist);
  //   }
  // };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>
          {item.title} by {item.author}
        </Text>
      </View>
    );
  };

  const renderPlaylist = (playlist) => {
    const isActive = activePlaylist === playlist;
    const playlistItems = MUTOONS.filter((item) => item.playlist === playlist);

    return (
      // {playlistItems &&}
      <View style={styles.playlistContainer}>
        <TouchableOpacity
          onPress={() => togglePlaylist(playlist)}
          style={styles.dropList}
        >
          <Text style={styles.playlistTitle}>{playlist}</Text>
          <Ionicons
            name={
              isActive
                ? "caret-down-circle-sharp"
                : "caret-forward-circle-sharp"
            }
            size={24}
            color={colors.accent60}
          />
        </TouchableOpacity>
        {isActive && (
          <FlatList
            data={playlistItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={Playlist}
      renderItem={({ item }) => renderPlaylist(item)}
      keyExtractor={(item) => item}
    />
  );
};

export default Accordion;

const styles = {
  playlistContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: colors.white,
    marginVertical: 7,
    marginHorizontal: 10,
    elevation: 2,
    borderRadius: 6,
  },
  dropList: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playlistTitle: {
    fontWeight: "bold",
    color: colors.accent100,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
  },
  author: {},
};
