import { ensureError } from "@/lib/utils";

const BASE_URL = "http://localhost:7777";

export class Auth {
  static registration = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch(BASE_URL + "/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const loggedUser: ServerResponse<User> = await response.json();
      return loggedUser;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };

  static login = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const loggedUser: ServerResponse<{token: string}> = await response.json();
      return loggedUser;
    } catch (err) {
      const error = ensureError(err);
      return error;
    }
  };
}
