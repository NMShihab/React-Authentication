import { getDbConnection } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const db = getDbConnection("react-auth-db");

    //  find the email exist or not
    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.sendStatus(409);
    }

    // Make hash password
    const passHash = await bcrypt.hash(password, 10);

    const info = {
      position: "",
      favLanguage: "",
      level: "",
    };

    // Insert data into db

    const result = await db.collection("users").insertOne({
      email,
      passHash,
      info,
      isVarifaied: false,
    });

    // Get id of inserted data

    const { insertedId } = result;

    // Create jwt token
    jwt.sign(
      {
        id: insertedId,
        email,
        info,
        isVarifaied: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({ token });
      }
    );
  },
};
