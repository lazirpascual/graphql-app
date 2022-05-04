import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
    }
  }
`;

export const useMovies = () => {
  const { error, data, loading } = useQuery(QUERY_ALL_MOVIES);

  return {
    error,
    data,
    loading,
  };
};
