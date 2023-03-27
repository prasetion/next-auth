import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import styles from "../styles/form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";

const login = () => {
  const [show, setShow] = useState(false);

  // google handler function
  async function handlerGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // github handler function
  async function handlerGithubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <div>
      <Layout>
        <Head>
          <title>Login</title>
        </Head>
        <section className="w-3/4 mx-auto flex flex-col gap-10">
          <div className="title">
            <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
            <p className="w-3/4 mx-auto text-gray-400">How to login</p>
          </div>

          <form action="" className="flex flex-col gap-5">
            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                placeholder="email"
                className={styles.input_text}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div className={styles.input_group}>
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="password"
                className={styles.input_text}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>

            <div>
              <button type="submit" className={styles.button}>
                Login
              </button>
            </div>
          </form>
          <div>
            <button
              type="submit"
              onClick={handlerGoogleSignIn}
              className={styles.button_custom}
            >
              Sign In with Google{" "}
              <Image
                src={"/assets/google.svg"}
                width={20}
                height={20}
                alt="got it"
              ></Image>
            </button>
          </div>
          <div>
            <button
              type="submit"
              onClick={handlerGithubSignIn}
              className={styles.button_custom}
            >
              Sign In with Github{" "}
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
                alt="got it"
              ></Image>
            </button>
          </div>
          <p className="text-center text-gray-400">
            don't have an account yet?{" "}
            <Link href={"/register"} className="text-blue-700">
              Sign Up
            </Link>
          </p>
        </section>
      </Layout>
    </div>
  );
};

export default login;
