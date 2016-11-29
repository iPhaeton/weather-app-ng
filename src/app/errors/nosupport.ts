export class NoSupportError extends Error{
  constructor (message) {
    super (message + "is not supported by your browser");

    this.message = message + "is not supported by your browser";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSupportError);
    } else {
      this.stack = (new Error()).stack;
    }
  }

  name:string = "NoSupportError";
  message:string;
}
