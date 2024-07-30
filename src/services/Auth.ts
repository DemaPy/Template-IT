import { BASE_URL } from "@/config";
import { handleResponseDB } from "@/utils/handleResponse";

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
      handleResponseDB({ json, response });
      return json;
    } catch (err) {
      throw err;
    }
  };

  static login = async (data: {
    email: string;
    password: string;
  }): Promise<
    | ServerResponseSuccess<{
        data: {
          token: string;
        };
        status: "success";
      }>
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
      handleResponseDB({ json, response });
      return json as ServerResponseSuccess<{
        data: {
          token: string;
        };
        status: "success";
      }>;
    } catch (error) {
      throw error;
    }
  };
}
