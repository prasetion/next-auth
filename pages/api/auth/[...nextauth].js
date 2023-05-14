import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/schema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "connection failed";
        });

        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new error("No user, please sign up");
        }

        const checkPass = await compare(credentials.password, result.password);
        if (!checkPass || result.email !== credentials.email) {
          throw new error("Invalid email or password");
        }

        return result;
      },
    }),
  ],
  secret: process.env.SECRET_KEY,
});
