import Form from "./Form/Form";
import Table from "./Table";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  const [allUsers, setAllUsers] = useState<UserProps[]>([]);
  const [editUser, setEditUser] = useState<UserProps | null>(null);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const result = await response.json();
      setAllUsers(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAdd = async (newUser: UserProps) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const newUserData = await response.json();
      setAllUsers((prevUsers) => [...prevUsers, newUserData]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUserEdit = (selectedUser: UserProps) => {
    setEditUser(selectedUser);
  };

  const handleUserDelete = async (selectedId: string) => {
    await fetch(`${API_URL}/users/${selectedId}`, { method: "DELETE" });
    setAllUsers((prevUsers) =>
      prevUsers.filter((user: UserProps) => user.id !== selectedId),
    );
  };

  const handleUpdate = async (selectedUser: UserProps) => {
    try {
      await fetch(`${API_URL}/users/${selectedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? selectedUser : user,
        ),
      );
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <main>
      <Form onAdd={handleAdd} editUser={editUser} onUpdate={handleUpdate} />
      <Table
        userList={allUsers}
        editData={handleUserEdit}
        onDelete={handleUserDelete}
      />
    </main>
  );
}

export default App;
