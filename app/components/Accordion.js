import React, { useState } from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

const items = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Kitab At-Tawheed",
    author: "Muhammad bn Abdulwahab",
    playlist: "Aqeedah/Tawhid",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Kitab At-Tawheed",
    author: "Muhammad bn Abdulwahab",
    playlist: "Manhaj",
  },
];

const playlists = ["Manhaj", "Aqeedah/Tawhid"];

const Accordion = () => {
  const [activePlaylist, setActivePlaylist] = useState(null);

  const togglePlaylist = (playlist) => {
    setActivePlaylist(activePlaylist === playlist ? null : playlist);
  };

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
    const playlistItems = items.filter((item) => item.playlist === playlist);
    return (
      <View style={styles.playlistContainer}>
        <TouchableOpacity onPress={() => togglePlaylist(playlist)}>
          <Text style={styles.playlistTitle}>{playlist}</Text>
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
      data={playlists}
      renderItem={({ item }) => renderPlaylist(item)}
      keyExtractor={(item) => item}
    />
  );
};

export default Accordion;

const styles = {
  playlistContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  playlistTitle: {
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
  },
  author: {},
};
