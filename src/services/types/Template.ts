import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";

export type TemplateResponse<T> = Promise<
  | ServerResponseSuccess<T>
  | ValidationError
  | AccessError
  | AuthError
  | ServerResponseError
>;

export type CreateTemplateDTO = {
  title: Template["title"];
};

export type DeleteTemplateDTO = {
  id: Template["id"];
};
