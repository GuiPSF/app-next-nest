import styled from "styled-components";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Side = styled.aside`
  width: 220px;
  background-color: #f3f4f6;
  padding: 2rem 1rem;
  height: calc(100vh - 60px); // minus navbar height
`;

export default function Sidebar() {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  }
  return (
    <Side>
      <ul style={{display: "flex", flexDirection: "column" ,gap: 10}}>
        <li><Link href="/users">Users List</Link></li>
        <li>
          <Button onClick={logout}>LogOut</Button>
        </li>
      </ul>
    </Side>
  );
}
