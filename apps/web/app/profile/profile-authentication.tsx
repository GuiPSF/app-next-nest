"use client";
import Layout from "../components/organisms/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return null;
  return (
    <Layout>
      <h1>👤 Profile</h1>
      <p>This is your profile page.</p>
    </Layout>
  );
}
