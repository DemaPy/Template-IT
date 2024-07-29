export type TemplateResponse<T> = Promise<ServerResponseSuccess<T>>;

export type CreateTemplate = {
  title: Template["title"];
};

export type UpdateTemplate = {
  id: Template["id"];
  title: Template["title"];
};

export type DeleteTemplate = {
  id: Template["id"];
};
