import { HTTP } from "../utils/enums";
import { iError } from "../utils/interfaces";

export class mainError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly success: boolean = false;
  public readonly status: HTTP;

  constructor(args: iError) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.message = args.message;
    this.name = args.name;
    this.status = args.status;

    if (this.success !== undefined) {
      this.success = args.success;
    }
    Error.captureStackTrace;
  }
}
