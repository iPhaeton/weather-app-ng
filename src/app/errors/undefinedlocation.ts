export class UndefinedLocationError extends Error{
  constructor (message) {
    super (message + "is undefined");

    this.message = message + "is undefined";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UndefinedLocationError);
    } else {
      this.stack = (new Error()).stack;
    }
  }

  name:string = "UdefinedLocationError";
  message:string;
}
