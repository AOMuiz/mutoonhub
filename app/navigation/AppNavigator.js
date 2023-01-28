import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import BooksScreen from "../screens/BooksScreen";
import SearchScreen from "../screens/SearchScreen";
import AddBookScreen from "../screens/AddBookScreen";
import MenuScreen from "../screens/MenuScreen";
import NewBookButton from "./NewBookButton";
import HomeNavigator from "./HomeNavigator";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "500",
          fontSize: 16,
          color: colors.N80,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Book"
        component={BooksScreen}
        options={{
          headerTitle: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddBook"
        component={AddBookScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewBookButton onPress={() => navigation.navigate("AddBook")} />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
