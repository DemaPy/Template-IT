import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";

export type UpdateSectionProps = {
  id: Section["id"];
  title: Section["title"];
  content: Section["content"];
  templateId: Template["id"];
  placeholders: PlaceholderToCreate[]
};

export type CreateSectionFromComponent = {
  templateId: Template["id"];
  componentId: Component["id"];
};

export type CreateSection = {
  title: Section["title"];
  content: Section["content"];
  templateId: Template["id"];
  placeholders: PlaceholderToCreate[];
};

export type DeleteSection = {
  id: Section["id"];
};

export type DuplicateSection = {
  id: Section["id"];
};

export type SectionResponse = Promise<
  | ServerResponseSuccess<Section>
  | ValidationError
  | AccessError
  | AuthError
  | ServerResponseError
>;

export type PlaceholderResponse<T> = Promise<
  | ServerResponseSuccess<T>
  | ValidationError
  | AccessError
  | AuthError
  | ServerResponseError
>;
