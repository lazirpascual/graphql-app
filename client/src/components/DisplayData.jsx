import React from "react";
import { useUsers } from "../hooks/useUsers";

const DisplayData = () => {
  const { error, data, loading } = useUsers();

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
    </div>
  );
};

export default DisplayData;
