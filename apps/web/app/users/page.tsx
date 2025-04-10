import { getUser } from "../../server/users";
import { User } from "@repo/types";
import UsersBoard from "../components/organisms/UsersBoard";

export default async function UsersPage() {
  const users: User[] = await getUser();

  return <UsersBoard users={users} />;
}
