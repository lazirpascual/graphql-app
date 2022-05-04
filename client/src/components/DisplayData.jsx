import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useMovies } from "../hooks/useMovies";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const { error, data, loading, refetch } = useUsers();
  const { data: movieData } = useMovies();

  // fetch movie state
  const [movieSearched, setMovieSearched] = useState("");

  // create user states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  // lazy query hook
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  // create user mutation
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  // delete user mutation
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>

      {data.users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Username: {user.username}</h1>
            <h1>Age: {user.name}</h1>
            <h1>Nationality: {user.nationality}</h1>
            <button
              onClick={() => {
                deleteUser({
                  variables: {
                    id: user.id,
                  },
                });

                refetch();
              }}
            >
              Delete User
            </button>
            <hr />
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
      <button
        onClick={() => {
          fetchMovie({ variables: { name: movieSearched } });
        }}
      >
        Fetch Data
      </button>
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
