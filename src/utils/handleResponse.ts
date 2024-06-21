import { AccessError } from "@/services/Errors/AccessError";
import { AuthError } from "@/services/Errors/AuthError";
import { Location, NavigateFunction } from "react-router-dom";

type Response<T> =
  | ServerResponseSuccess<T>
  | ServerResponseValidationError
  | AccessError
  | AuthError
  | ServerResponseError;

export const handleResponse = <T>(
  response: Response<T>,
  location: Location<any>,
  navigate: NavigateFunction
) => {
  if (response instanceof AccessError) {
    navigate(`/access-denied`);
    return;
  }

  if (response instanceof AuthError) {
    localStorage.removeItem("token");
    navigate(`/login?redirect=${location.pathname}`);
    return;
  }

  if (response.status === "error") {
    if ("errors" in response) {
      let error_message = "";
      for (const error of response.errors) {
        error_message += response.message + ": " + error.msg;
      }
      alert(error_message);
      return;
    }

    alert(response.message);
    return;
  }
  return response;
};
