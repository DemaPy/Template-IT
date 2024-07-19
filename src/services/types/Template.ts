export type TemplateResponse<T> = Promise<ServerResponseSuccess<T>>;

export type CreateTemplateDTO = {
  title: Template["title"];
};

export type UpdateTemplateDTO = {
  id: Template["id"];
  title: Template["title"];
};

export type DeleteTemplateDTO = {
  id: Template["id"];
};
