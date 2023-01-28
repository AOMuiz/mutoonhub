import { createStackNavigator } from "@react-navigation/stack";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ReadBook from "../screens/ReadBook";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      options={{ headerShown: false }}
      component={HomeScreen}
    />
    <Stack.Screen
      name="BookDetails"
      component={BookDetailsScreen}
      options={({ route }) => ({ title: route.params.title })}
    />
    <Stack.Screen
      name="ReadBook"
      component={ReadBook}
      options={({ route }) => ({ title: route.params.title })}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
