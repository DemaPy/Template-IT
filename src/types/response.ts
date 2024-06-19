type ServerResponseSuccess<T> = {
  status: "success";
  message: string;
  data: T;
};

type ServerResponseError = {
  status: "error";
  message: string;
};

type ServerResponseAuthenticationError = {
  status: "error";
  message: string;
  code: 401
};

type ServerResponseAuthorizationError = {
  status: "error";
  message: string;
  code: 403
};

type ServerResponseValidationError = {
  status: "error";
  message: string;
  errors: {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }[];
};
