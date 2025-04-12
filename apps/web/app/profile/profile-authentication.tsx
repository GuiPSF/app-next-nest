"use client";

import Layout from "../components/organisms/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default  function ProfileAuth() {

  
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedUserame, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserame: string | null = localStorage.getItem("username")
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      setUserName(storedUserame)
    }
  }, []);

  if (!isAuthenticated) return null;
  return (
    <Layout>
      <h1>👤 Welcome {storedUserame} </h1>
      <p>This is your profile page.</p>
    </Layout>
  );
}
