export type UpdateComponentDTO = {
  id: Component["id"];
  title: Component["title"];
  content: Component["content"];
  placeholdersToDelete: Placeholder[]
  placeholdersToCreate: Placeholder[]
};

export type CreateComponentDTO = {
  title: Component["title"];
  content: Component["content"];
  placeholders: Placeholder[]
};