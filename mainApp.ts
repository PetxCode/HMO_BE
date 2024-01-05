import { Application, Request, Response } from "express";
import user from "./router/userRouter";
import member from "./router/memberRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/api", user);
    app.use("/api", member);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "HMO API",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error loading",
        });
      }
    });
  } catch (error) {
    return error;
  }
};
