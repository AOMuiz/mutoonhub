import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../config/colors";

const Card = ({ title, author, image, onPress, isRecommended }) => {
  return (
    <View style={[styles.container, isRecommended && styles.recommended]}>
      <View style={styles.detailsContainer}>
        <Image style={styles.image} source={image} />
        <TouchableOpacity onPress={onPress}>
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Pressable style={styles.more}>
        <Feather name="more-horizontal" size={24} color={colors.medium} />
      </Pressable>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 10,
    marginVertical: 10,
    //apply when it is last played
    // borderRadius: 17,
    // padding: 7,
    // borderWidth: 1,
    // elevation: 8,
    // backgroundColor: "white",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  recommended: {
    borderRadius: 17,
    padding: 7,
    borderWidth: 1,
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  details: { marginHorizontal: 10 },
  title: { fontSize: 18 },
  author: { color: colors.primary, marginVertical: 5 },
  more: { alignSelf: "flex-start" },
});
