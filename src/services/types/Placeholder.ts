export type CreatePlaceholders = {
  id: Component["id"] | Section["id"];
  content: Component["content"];
  placeholders: Placeholder[];
};

export type UpdatePlaceholder = {
  id: Placeholder["id"];
  title: Placeholder["title"];
  fallback: Placeholder["fallback"];
};
