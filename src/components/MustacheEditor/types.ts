export interface ParsedTemplate {
  template: string;
  tokens: Mustache.TemplateSpans;
  placeholders: Placeholder[]
}
