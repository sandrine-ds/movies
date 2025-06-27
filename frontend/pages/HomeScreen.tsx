import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  View,
  Button,
  Pressable,
} from "react-native";

import type { Movies } from "../../types/types";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App.js";

// type ResultData = {
//   page: number;
//   results: Movie[];
// };

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [movies, setMovies] = useState<Movies | null>(null);

  const [page, setPage] = useState<number[]>([1]);

  useEffect(() => {
    fetch("http://localhost:3000/movies/popular/1", options)
      .then((res) => {
        return res.json();
      })

      .then((data) => setMovies(data.results.results))
      .catch((err) => {
        console.error("Fetch Error", err);
      });
  }, []);

  // const navigation = useNavigation();

  return movies !== null ? (
    <ScrollView
      style={
        {
          // backgroundColor: "red",
          // backgroundImage:
          //   "linear-gradient(155deg,rgba(15, 15, 46, 1) 0%, rgba(58, 29, 77, 1) 50%, rgba(48, 7, 74, 1) 100%)",
        }
      }
    >
      {/* <Text>Welcome</Text> */}
      {movies.map(({ poster_path, id }) => {
        return (
          <View key={id}>
            <Pressable
              onPress={() => {
                console.log("id???", id);

                return navigation.navigate("Detail", {
                  movieId: id,
                });
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
                }}
              />
            </Pressable>
          </View>
        );
      })}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button title="Search" onPress={() => navigation.navigate("Search")} />
        {/* Search
        </Button> */}
      </View>
    </ScrollView>
  ) : (
    <Text>No movies</Text>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
