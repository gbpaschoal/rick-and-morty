type ErrorContext = {
  endpoint?: string;
  statusCode?: number;
};

export class ApiError extends Error {
  public readonly endpoint?: string;
  public readonly statusCode?: number;

  constructor(
    context: ErrorContext,
    message: string = "Rick and Morty API error was made.",
  ) {
    super(message);

    this.name = "ApiError";
    this.endpoint = context.endpoint;
    this.statusCode = context.statusCode;
  }

  toLogObject() {
    return {
      type: this.name,
      message: this.message,
      endpoint: this.endpoint,
      statusCode: this.statusCode,
      stack: this.stack,
    };
  }
}
