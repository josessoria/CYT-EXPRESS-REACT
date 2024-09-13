import React, { createContext, useState, ReactNode } from "react";

interface User {
  _id: string; // Cambiado de id a _id
  username: string;
  email: string;
  role: string;
}

export interface UsersContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (newUser: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (_id: string) => void; // Cambiado de id a _id
}

const initialUsersContext: UsersContextType = {
  users: [],
  setUsers: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
};

export const UsersContext =
  createContext<UsersContextType>(initialUsersContext);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map(
      (user) => (user._id === updatedUser._id ? updatedUser : user) // Actualizado para _id
    );

    setUsers(updatedUsers);
  };

  const deleteUser = (_id: string) => {
    // Actualizado para _id
    const updatedUsers = users.filter((user) => user._id !== _id); // Actualizado para _id
    setUsers(updatedUsers);
  };

  return (
    <UsersContext.Provider
      value={{ users, setUsers, addUser, updateUser, deleteUser }}
    >
      {children}
    </UsersContext.Provider>
  );
};
