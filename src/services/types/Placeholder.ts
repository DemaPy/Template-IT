export type CreatePlaceholdersDTO = {
  id: Component["id"] | Section["id"];
  content: Component["content"];
  placeholders: Placeholder[];
};
