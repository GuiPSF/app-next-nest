import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { getUser } from "../server/users";
import { User } from "@repo/types"

export default async function Home() {
  const users: User[] = await getUser()
  return (
    <div className={styles.page}>
      <ul>
        {users.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
