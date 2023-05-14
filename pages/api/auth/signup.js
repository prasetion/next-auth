import Users from "@/model/schema";
import connectMongo from "../../../database/conn";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  //   res.json({ message: "Sign Up Post Request" });
  connectMongo().catch((error) =>
    req.json({
      error: "Connection Failed",
    })
  );

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({
        message: "Don't have form data",
      });
    }

    const { username, email, password } = req.body;
    const checkExisting = await Users.findOne({ email });
    if (checkExisting)
      return res.status(422).json({ message: "User already exist" });

    // Users.create(
    //   { username, email, password: await hash(password, 12) },
    //   function (err, data) {
    //     if (err) return res.status(400).json({ err });

    //     res.status(201).json({ status: true, user: data });
    //   }
    // );

    const createUser = await Users.create({
      username,
      email,
      password: await hash(password, 12),
    });
    res.status(201).json({ status: "new user created" });
  } else {
    res.status(500).json({
      message: "POST valid only",
    });
  }
}
