import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";

export type CampaignResponse = Promise<
  | ServerResponseSuccess<Campaign>
  | ValidationError
  | AccessError
  | AuthError
  | ServerResponseError
>;
