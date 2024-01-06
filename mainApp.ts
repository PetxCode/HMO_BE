import { Application, NextFunction, Request, Response } from "express";
import user from "./router/userRouter";
import member from "./router/memberRouter";
import hospital from "./router/hospitalRoute";
import appontment from "./router/appoinmentRouter";
import doctor from "./router/doctorRouter";
import { HTTP } from "./utils/enums";
import { mainError } from "./error/mianError";
import { handleError } from "./error/handleError";

export const mainApp = (app: Application) => {
  try {
    app.use("/api", user);
    app.use("/api", member);

    app.use("/api", hospital);
    app.use("/api", doctor);

    app.use("/api", appontment);

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

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new mainError({
          name: `Route Error`,
          message: `Route Error: because the page, ${req.originalUrl} doesn't exist`,
          status: HTTP.BAD_REQUEST,
          success: false,
        })
      );
    });

    app.use(handleError);
  } catch (error) {
    return error;
  }
};
