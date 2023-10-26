export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

class APIError extends Error {
  constructor(
    public name: string,
    public statusCode?: number,
    public description?: string
  ) {
    super(description);
  }
}

export class ServerError extends APIError {
  constructor(public description: string) {
    super(
      "Internal Server error",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      description
    );
  }
}

export class NotFound extends APIError {
  constructor(public description: string) {
    super("Not Found", STATUS_CODES.NOT_FOUND, description);
  }
}
