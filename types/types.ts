import { P } from "ts-pattern";

export const moviesPattern = P.array({
  backdrop_path: P.string,
  genre_ids: P.array(P.string),
  id: P.number,
  overview: P.string,
  popularity: P.number,
  poster_path: P.string,
  release_date: P.string,
  vote_average: P.number,
  vote_count: P.number,
  title: P.string,
});

export type Movies = P.infer<typeof moviesPattern>;

export type Movie = Movies[number];
