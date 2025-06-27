import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ScrollView, Text } from "react-native";
// import type { RootStackParamList } from "../App";
import { useEffect, useState } from "react";
import type { Movie, Movies } from "../../types/types";
import { SearchBar } from "react-native-screens";
import { match, P } from "ts-pattern";

// type Props = {
//   navigation: NativeStackScreenProps<RootStackParamList, "Detail">;
//   movieId: number;
// };
type Props = {
  // route: NativeStackScreenProps<RootStackParamList, "Search">;
};

// type ProfileScreenNavigationProp = Props["navigation"];

// type ProfileScreenRouteProp = Props["route"];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const SearchScreen = () => {
  const [movies, setMovies] = useState<Movies | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/movies/search/${query}/1`, options)
      .then((res) => res.json())

      .then((data) => setMovies(data.results))
      .catch((err) => {
        console.error("Fetch Error", err);
      });
  }, [query]);

  return (
    <ScrollView
      style={
        {
          // backgroundColor: "red",
          // backgroundImage:
          //   "linear-gradient(155deg,rgba(15, 15, 46, 1) 0%, rgba(58, 29, 77, 1) 50%, rgba(48, 7, 74, 1) 100%)",
        }
      }
    >
      <SearchBar onChangeText={(text) => setQuery(text.nativeEvent.text)} />
      {match(movies)
        .with(P.not(null), (movies) => (
          <>
            {movies.map((movie) => (
              <Image
                key={movie.id}
                style={{ width: 100, height: 100 }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            ))}
          </>
        ))
        .otherwise(() => (
          <Text>No result</Text>
        ))}
    </ScrollView>
  );
};
