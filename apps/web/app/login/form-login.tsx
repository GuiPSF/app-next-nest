"use client";

import { useState } from "react";
import Form from "../components/molecules/Form"
import Input from "../components/atoms/Input";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3333/auth/login", {
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
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'black'}}> Login to your account </h2>
        <Input placeholder="Username" name="username" onChange={handleChange}/>
        <Input placeholder="Password" type="password" name="password" onChange={handleChange}></Input>
        <button type="submit">Logar</button>
      </Form>
    </div>
  );
}
