export class ServerResponseError extends Error{
  constructor (status, message) {
    super (message);

    this.message = message;
    this.responseStatus = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerResponseError);
    } else {
      this.stack = (new Error()).stack;
    }
  }

  name:string = "ServerResponseError";
  message:string;
  responseStatus:number;
}
