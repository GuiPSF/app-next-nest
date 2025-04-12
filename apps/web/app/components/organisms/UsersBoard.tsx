"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { User } from "@repo/types";
import Button from "../atoms/Button";
import { redirect } from "next/navigation";
import Modal from "../molecules/Modal";
import Input from "../atoms/Input";

interface UsersBoardProps {
  users: User[];
}

const SUsersBoard = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const UserItem = styled.li`
  list-style: none;
  background-color: #fff;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserRole = styled.span`
  background-color: #eef2ff;
  color: #4f46e5;
  font-size: 0.85rem;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
`;

const ActionWrapper = styled.div`
  position: relative;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  right: 0;
  top: 2rem;
  list-style: none;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 0;
  min-width: 100px;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #111827;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const UsersBoard: React.FC<UsersBoardProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [role, setRole] = useState<User | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (username: string) => {
    setOpenDropdown((prev) => (prev === username ? null : username));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:3333/users/${selectedUser?.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      }
    );

    if (res.ok) {
      alert("User updated!");
      console.log(...editData.role)
      setIsModalOpen(false);
      window.location.reload();
    } else {
      const error = await res.text();
      alert(`Error: ${error}`);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    if(localStorage.getItem("role") === "user" && localStorage.getItem("username") != user.username){
      alert('Only admins can edit other users!')
      window.location.reload();
      return null
    }
    setEditData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (user: User) => {
    if(localStorage.getItem("role") === "user"){
      alert('Você não tem permissões para realizar isto!')
      window.location.reload();
      return null
    }
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.username}?`
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3333/users/${user.username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to delete:", error);
        alert("Failed to delete user.");
        return;
      }

      alert("User deleted successfully!");

      window.location.reload();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <SUsersBoard>
      <h2>👥 All Users</h2>
      <ul style={{ padding: 0 }}>
        {users.map((user) => (
          <UserItem key={user.username}>
            <UserInfo>
              <strong>{user.username}</strong>
              <span>{user.email}</span>
            </UserInfo>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <UserRole>{user.role}</UserRole>
              <ActionWrapper>
                <ActionButton onClick={() => toggleDropdown(user.username)}>
                  ⋮
                </ActionButton>
                {openDropdown === user.username && (
                  <Dropdown>
                    <DropdownItem onClick={() => handleEditClick(user)}>
                      ✏️ Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => handleDelete(user)}>
                      🗑️ Delete
                    </DropdownItem>
                  </Dropdown>
                )}
              </ActionWrapper>
            </div>
          </UserItem>
        ))}
      </ul>
      <Button onClick={() => redirect("/profile")}>Back</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Edit User</h3>
        <p style={{ margin: 0 }}>Username</p>
        <Input
          placeholder="username"
          name="username"
          value={editData.username}
          onChange={handleEditChange}
        />
        <p style={{ margin: 0 }}>Email</p>
        <Input
          placeholder="email"
          name="email"
          value={editData.email}
          onChange={handleEditChange}
        />
        <p style={{ margin: 0 }}>Role</p>
        <Input
          placeholder="role"
          name="role"
          value={editData.role}
          onChange={handleEditChange}
        />
        <Button onClick={handleSave}>Save</Button>
      </Modal>
    </SUsersBoard>
  );
};

export default UsersBoard;
