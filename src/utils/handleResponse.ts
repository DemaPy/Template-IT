import { AccessError } from "@/services/Errors/AccessError";
import { AuthError } from "@/services/Errors/AuthError";
import { ValidationError } from "@/services/Errors/ValidationError";
import { Location, NavigateFunction } from "react-router-dom";

type Response<T> =
  | ServerResponseSuccess<T>
  | ValidationError
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

  if (response instanceof ValidationError) {
    console.log(response);
    let error_message = "";
    for (const error of response.errors) {
      error_message += response.message + ": " + error.msg;
    }
    alert(error_message);
    return;
  }

  if (response.status === "error") {
    alert(response.message);
    return;
  }
  return response;
};
