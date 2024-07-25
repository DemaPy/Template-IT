import { AccessError } from "../Errors/AccessError";
import { AuthError } from "../Errors/AuthError";
import { ValidationError } from "../Errors/ValidationError";

export type UpdateSectionDTO = {
  id: Section["id"];
  title: Section["title"];
  content: Section["content"];
  templateId: Template["id"];
  placeholdersToDelete: Placeholder[]
  placeholdersToCreate: Placeholder[]
};

export type UpdatePlaceholderDTO = {
  id: Placeholder["id"];
  title: Placeholder["title"];
  fallback: Placeholder["fallback"];
};

export type CreateSectionFromComponentDTO = {
  templateId: Template["id"];
  componentId: Component["id"];
};

export type CreateSectionDTO = {
  title: Section["title"];
  content: Section["content"];
  templateId: Template["id"];
  placeholders: Placeholder[];
};

export type DeleteSectionDTO = {
  id: Section["id"];
};

export type DuplicateSectionDTO = {
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
