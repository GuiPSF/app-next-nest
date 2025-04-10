"use client";

import { useState, useEffect } from "react";
import Form from "../components/molecules/Form";
import Input from "../components/atoms/Input";
import Link from "next/link";
import Button from "../components/atoms/Button";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      router.push("/profile");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Teste");
      }

      const data = await res.json();
      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        router.push("/profile");
      } else {
        alert("Login Failed");
      }
    } catch (err: any) {
      setError("Wrong Credentials");
    }
    //return data;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2
          style={{ textAlign: "center", marginBottom: "1rem", color: "black" }}
        >
          {" "}
          Login to your account{" "}
        </h2>
        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}
        <p style={{ margin: 0 }}>Username</p>
        <Input placeholder="Username" name="username" onChange={handleChange} />
        <p style={{ margin: 0 }}>Password</p>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        ></Input>
        <Button type="submit">Logar</Button>
        <div style={{ alignSelf: "center" }}>
          <p>
            Don't have an account? <Link href="/signup">Create now!</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
