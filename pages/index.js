import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";

export default function Home() {
  // const [session, setSession] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>Next Auth</title>
      </Head>
      {session ? User({ session, handleSignOut }) : Guest()}
    </>
  );
}

// guest

const Guest = () => {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className=" text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
};

const User = ({ session, handleSignOut }) => {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className=" text-4xl font-bold">Authorize user Homepage</h3>
      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-center">
        <Link
          href={"/profile"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
        >
          Profile
        </Link>
      </div>
    </main>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
