import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import styles from "../styles/form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";
import { useRouter } from "next/router";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit: onSubmit,
  });

  async function onSubmit(values) {
    // console.log(values);
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      router.push(status.url);
    }
  }

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

          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={formik.handleSubmit}
          >
            <div
              className={`${styles.input_group} ${
                formik.errors.email && formik.touched.email
                  ? "border-rose-600"
                  : ""
              } `}
            >
              <input
                type="email"
                name="email"
                placeholder="email"
                className={styles.input_text}
                {...formik.getFieldProps("email")}
              />
              <span className="icon flex items-center px-4">
                <HiAtSymbol size={25} />
              </span>
            </div>
            <div
              className={`${styles.input_group} ${
                formik.errors.password && formik.touched.password
                  ? "border-rose-600"
                  : ""
              } `}
            >
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                placeholder="password"
                className={styles.input_text}
                {...formik.getFieldProps("password")}
              />
              <span
                className="icon flex items-center px-4"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={25} />
              </span>
            </div>
            {/* {formik.errors.password && formik.touched.password ? (
              <span className=" text-rose-500">{formik.errors.password}</span>
            ) : (
              <></>
            )} */}

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
            do not have an account yet?{" "}
            <Link href={"/register"} className="text-blue-700">
              Sign Up
            </Link>
          </p>
        </section>
      </Layout>
    </div>
  );
};

export default Login;
