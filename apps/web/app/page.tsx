import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { getUser } from "../server/users";
import { User } from "@repo/types";
import FormSignup from "./form-signup";
import FormLogin from "./login/form-login";
import { redirect } from "next/navigation";

function createUser(){

}

export default async function Home() {
  redirect('/login');
  const users: User[] = await getUser();

  // return (
  //   <div className={styles.page}>
  //       <FormSignup />
  //       <FormLogin />
  //   </div>
  // );
}
