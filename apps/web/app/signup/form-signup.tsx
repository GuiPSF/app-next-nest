"use client";
import Form from "../components/molecules/Form"
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useState } from "react";

export default function FormSignup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3333/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: 'black'}}>Welcome!</h1>
      <Input placeholder="Username" name="username" onChange={handleChange} />
      <Input placeholder="Email" name="email" onChange={handleChange} />
      <Input placeholder="Password" name="password" type="password" onChange={handleChange} />
      <Input placeholder="User Role" name="role" onChange={handleChange} />
      <button type="submit">Submit</button>
    </Form>
  );
}
