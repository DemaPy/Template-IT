export type UpdateComponent = {
  id: Component["id"];
  title: Component["title"];
  content: Component["content"];
  placeholders: PlaceholderToCreate[];
};

export type CreateComponent = {
  title: Component["title"];
  content: Component["content"];
  placeholders: Placeholder[];
};
