import { Location, NavigateFunction } from "react-router-dom";

type Response<T> =
  | ServerResponseSuccess<T>
  | ServerResponseValidationError
  | ServerResponseAuthorizationError
  | ServerResponseAuthenticationError
  | ServerResponseError;

export const handleResponse = <T>(response: Response<T>, location: Location<any>, navigate: NavigateFunction) => {
  if (response.status === "error") {
    if ("errors" in response) {
      let error_message = "";
      for (const error of response.errors) {
        error_message += response.message + ": " + error.msg;
      }
      alert(error_message);
      return;
    }

    if ("code" in response && response.code === 401) {
      localStorage.removeItem("token")
      navigate(`/login?redirect=${location.pathname}`);
    }

    if ("code" in response && response.code === 403) {
      navigate(`/access-denied`);
    }

    alert(response.message);
    return;
  }
  return response
};
