import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

export const useUsers = () => {
  const { error, data, loading, refetch } = useQuery(QUERY_ALL_USERS);

  return {
    error,
    data,
    loading,
    refetch,
  };
};
