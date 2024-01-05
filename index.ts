import express, { Application } from "express";

import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
dotenv.config();

const app: Application = express();
const portServer = process.env.PORT!;

const port = parseInt(portServer);
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 24 * 60,
      sameSite: "lax",
      secure: false,
    },
  })
);

mainApp(app);
const server = app.listen(port, () => {
  console.clear();
  console.log();
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
