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

export class ServerResponseError extends Error{
  constructor (status, message) {
    super (message);

    this.message = message;
    this.responseStatus = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoSupportError);
    } else {
      this.stack = (new Error()).stack;
    }
  }

  name:string = "ServerResponseError";
  message:string;
  responseStatus:number;
}
