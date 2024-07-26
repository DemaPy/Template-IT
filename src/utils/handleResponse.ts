import { AccessError } from "@/services/Errors/AccessError";
import { AuthError } from "@/services/Errors/AuthError";
import { ValidationError } from "@/services/Errors/ValidationError";
import { Location, NavigateFunction } from "react-router-dom";

type Responses<T> =
  | ServerResponseSuccess<T>
  | ValidationError
  | AccessError
  | AuthError
  | ServerResponseError;

export const handleResponse = <T>(
  response: Responses<T>,
  location: Location<any>,
  navigate: NavigateFunction
) => {
  if (response instanceof AccessError) {
    return navigate(`/access-denied`);
  }

  if (response instanceof AuthError) {
    localStorage.removeItem("token");
    return navigate(`/login?redirect=${location.pathname}`);
  }

  if (response instanceof ValidationError) {
    let error_message = "";
    for (const error of response.errors) {
      error_message += response.message + ": " + error.msg;
    }
    alert(error_message);
    return null;
  }

  if (response.status === "error") {
    alert(response.message);
    return null;
  }
  return response;
};

export const handleResponseDB = ({
  json,
  response,
}: {
  json: any;
  response: Response;
}) => {
  if (!response.ok) {
    if (response.status === 403) {
      throw new AccessError({ message: json.message });
    }
    if (response.status === 401) {
      throw new AuthError({ message: json.message });
    }
  
    if ("errors" in json) {
      throw new ValidationError({
        message: json.message,
        errors: json.errors,
      });
    }
  
    throw new Error(json.message);
  }
};
