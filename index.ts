import express, { Application, NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
dotenv.config();

import MongoDB from "connect-mongodb-session";

const MongoDBStore = MongoDB(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URL_ONLINE!,
  collection: "sessions",
});

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Please come back in 5mins time!!!",
});

const app: Application = express();
const portServer = process.env.PORT!;

const port = parseInt(portServer);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5174");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

app.use(morgan("tiny"));
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      // maxAge: 1000 * 60 * 24 * 60,
      sameSite: "lax",
      secure: false,
    },

    store,
  })
);

mainApp(app);
const server = app.listen(process.env.PORT || port, () => {
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
