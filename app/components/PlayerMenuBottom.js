import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const PlayerMenuBottom = () => {
  return (
    <View style={styles.playerBottom}>
      <View style={styles.bottomIcon}>
        <MaterialCommunityIcons
          name="bookmark-minus-outline"
          size={24}
          color={colors.N80}
        />
        <Text style={styles.bottomIconLabel}>Bookmark</Text>
      </View>
      <View style={styles.bottomIcon}>
        <MaterialCommunityIcons name="repeat" size={24} color={colors.N80} />
        <Text style={styles.bottomIconLabel}>Repeat</Text>
      </View>
      <View style={styles.bottomIcon}>
        <MaterialCommunityIcons
          name="play-speed"
          size={24}
          color={colors.N80}
        />
        <Text style={styles.bottomIconLabel}>Speed 10x</Text>
      </View>
      <View style={styles.bottomIcon}>
        <MaterialCommunityIcons
          name="download-box-outline"
          size={24}
          color={colors.N80}
        />
        <Text style={styles.bottomIconLabel}>Download</Text>
      </View>
    </View>
  );
};

export default PlayerMenuBottom;

const styles = StyleSheet.create({
  playerBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },
  bottomIcon: {
    alignItems: "center",
  },
  bottomIconLabel: {
    fontSize: 10,
    colors: colors.N80,
    fontWeight: "400",
  },
});
