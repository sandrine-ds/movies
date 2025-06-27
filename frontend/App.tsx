import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./pages/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { DetailsScreen } from "./pages/DetailsScreen";
import { SearchScreen } from "./pages/SearchScreen";

export type RootStackParamList = {
  Home: undefined;
  Detail: { movieId: number };
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "tomato" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Overview" }}
        // navigation={"Detail"}
      />

      <Stack.Screen name="Detail" component={DetailsScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>

    // {/* // <StatusBar style="auto" /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
