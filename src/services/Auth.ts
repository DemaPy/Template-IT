const BASE_URL = "http://localhost:7777";

export class Auth {
  static registration = async (data: {
    email: string;
    password: string;
  }): Promise<
    | ServerResponseSuccess<User>
    | ServerResponseValidationError
    | ServerResponseError
  > => {
    try {
      const response = await fetch(BASE_URL + "/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!response.ok) {
        const error: ServerResponseValidationError = {
          message: json.message,
          status: "error",
          errors: json.errors

        };
        throw error;
      }
      return json;
    } catch (err) {
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };

  static login = async (data: {
    email: string;
    password: string;
  }): Promise<
    | ServerResponseSuccess<{ token: string }>
    | ServerResponseValidationError
    | ServerResponseError
  > => {
    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (!response.ok) {
        const error: ServerResponseValidationError = {
          message: json.message,
          status: "error",
          errors: json.errors

        };
        return error;
      }
      return json as ServerResponseSuccess<{ token: string }>;
    } catch (error) {
      return {
        status: "error",
        message: "Unknown error happend",
      };
    }
  };
}
