import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useMovies } from "../hooks/useMovies";
import { gql, useLazyQuery } from "@apollo/client";

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const { error, data, loading } = useUsers();
  const { data: movieData } = useMovies();
  const [movieSearched, setMovieSearched] = useState("");

  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME, { variables: { name: movieSearched } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div>
      {data.users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Username: {user.username}</h1>
            <h1>Age: {user.name}</h1>
            <h1>Nationality: {user.nationality}</h1>
          </div>
        );
      })}

      {movieData.movies.map((movie) => {
        return <h1>Movie Name: {movie.name}</h1>;
      })}

      <input
        type="text"
        placeholder="Interstellar.."
        onChange={(e) => setMovieSearched(e.target.value)}
      />
      <button onClick={fetchMovie}>Fetch Data</button>
      <div>
        {movieSearchedData && (
          <div>
            <h1>{movieSearchedData.movie.name}</h1>
            <h1>{movieSearchedData.movie.yearOfPublication}</h1>
          </div>
        )}
        {movieError && <div>There was an error fetching the data..</div>}
      </div>
    </div>
  );
};

export default DisplayData;
