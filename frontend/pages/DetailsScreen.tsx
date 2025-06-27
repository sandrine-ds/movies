import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ScrollView, Text } from "react-native";
import type { RootStackParamList } from "../App";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/types";

// type Props = {
//   navigation: NativeStackScreenProps<RootStackParamList, "Detail">;
//   movieId: number;
// };
type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

type ProfileScreenNavigationProp = Props["navigation"];

// type ProfileScreenRouteProp = Props["route"];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const DetailsScreen = ({ navigation, route }: Props) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  console.log("movieId", movieId);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${movieId}`, options)
      .then((res) => res.json())

      .then((data) => setMovie(data.results))
      .catch((err) => {
        console.error("Fetch Error", err);
      });
  }, [movieId]);

  return movie !== null ? (
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
      <Image
        key={movie.id}
        style={{ width: 100, height: 100 }}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
      />
    </ScrollView>
  ) : (
    <Text>No movies</Text>
  );
};
