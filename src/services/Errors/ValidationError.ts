export class ValidationError extends Error {
  status;
  errors;
  constructor({
    message,
    errors,
  }: {
    message: string;
    errors: {
      type: string;
      value: string;
      msg: string;
      path: string;
      location: string;
    }[];
  }) {
    super(message);
    this.name = "ValidationError";
    this.status = "error";
    this.errors = errors;
  }
}
