export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(args: { status: number; message: string; code?: string }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.code = args.code;
  }
}
