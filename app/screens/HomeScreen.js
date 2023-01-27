import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { MUTOONS } from "../../books";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";

const HomeScreen = ({ navigation }) => {
  const displayList = MUTOONS.slice(0, 4);

  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <AppText style={styles.greeting}>Welcome!</AppText>
          <AppText style={styles.subTitle}>
            What will you listen to today ?
          </AppText>
        </View>
        <View>
          <Card
            title={"Usool As-Sunnah"}
            author={"Imam Ahmad"}
            image={require("../../assets/usuulsunnah.png")}
            onPress={() => navigation.navigate("BookDetails")}
            isRecommended={true}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.sectionHeadingContainer}>
              <AppText style={styles.sectionHeader}>Listened recently</AppText>
              <Pressable>
                <AppText style={styles.seeAll}>See All</AppText>
              </Pressable>
            </View>
          }
          data={displayList}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              author={item.author}
              image={item.image}
              onPress={() => navigation.navigate("BookDetails", item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, margin: 10, marginHorizontal: 20 },
  sectionHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: colors.primary,
  },
  sectionHeader: { color: colors.primary },
  seeAll: { textTransform: "uppercase", color: colors.primary, fontSize: 14 },
  greeting: { fontSize: 24, fontWeight: "600", color: colors.primary },
  subTitle: { fontWeight: "500", color: colors.medium },
});
