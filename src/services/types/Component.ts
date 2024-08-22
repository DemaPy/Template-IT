export type UpdateComponent = {
  id: Component["id"];
  title: Component["title"];
  content: Component["content"];
  placeholdersToDelete: Placeholder[];
  placeholdersToCreate: Placeholder[];
};

export type CreateComponent = {
  title: Component["title"];
  content: Component["content"];
  tokens: Mustache.TemplateSpans;
  objectTokens: Record<string, string>;
  placeholders: Placeholder[];
};
