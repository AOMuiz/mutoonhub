import { createStackNavigator } from "@react-navigation/stack";
import colors from "../config/colors";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ReadBook from "../screens/ReadBook";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontWeight: "500",
        fontSize: 16,
        color: colors.N80,
      },
    }}
  >
    <Stack.Screen
      name="Home"
      options={{ headerShown: false }}
      component={HomeScreen}
    />
    <Stack.Screen
      name="BookDetails"
      component={BookDetailsScreen}
      options={({ route }) => ({
        title: route.params.title,
      })}
    />
    <Stack.Screen
      name="ReadBook"
      component={ReadBook}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
