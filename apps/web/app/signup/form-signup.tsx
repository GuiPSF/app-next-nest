"use client";
import Form from "../components/molecules/Form"
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { useState } from "react";
import Link from "next/link";

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
      <p style={{margin: 0}}>Username</p>
      <Input placeholder="Username" name="username" onChange={handleChange} />
      <p style={{margin: 0}}>Email</p>
      <Input placeholder="Email" name="email" onChange={handleChange} />
      <p style={{margin: 0}}>Password</p>
      <Input placeholder="Password" name="password" type="password" onChange={handleChange} />
      <p style={{margin: 0}}>Role</p>
      <Input placeholder="User Role" name="role" onChange={handleChange} />
      <Button type="submit">Submit</Button>
      <div style={{ alignSelf: "center" }}>
        <p>Already have an account? <Link href="/login">Login</Link></p>
      </div>
    </Form>
  );
}
