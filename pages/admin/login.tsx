import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { AuthenticationImage } from "@/components/AuthenticationImage";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <>
      <Head>
        <title>bukunia | Admin - Login</title>
      </Head>
      <AuthenticationImage />
    </>
  );
}
