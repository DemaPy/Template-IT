export type TemplateResponse<T> = Promise<ServerResponseSuccess<T>>;

export type CreateTemplateDTO = {
  title: Template["title"];
};

export type DeleteTemplateDTO = {
  id: Template["id"];
};
