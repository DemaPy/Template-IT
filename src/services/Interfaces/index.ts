interface TemplateServiceInterface {
  create(template: Omit<Template, "id">): Template;
  getAll(): Promise<Template[] | null>;
  getOne(id: string): Promise<Template | null>;
  copySection(template_id: string, section_id: string): Promise<Boolean | null>;

  deleteSection(
    template_id: string,
    section_id: string
  ): Promise<Boolean | null>;

  deletePlaceholder(
    template_id: string,
    placeholder_id: string,
    section_id: string
  ): Promise<boolean | null>;

  createSectionPlaceholder({
    name,
    position,
    section_id,
    template_id,
    fallback,
  }: {
    position: number;
    fallback: string;
    name: string;
    section_id: string;
    template_id: string;
  }): Promise<{ id: string; position: number } | null>;

  createSection(
    id: string,
    section: Omit<Section, "id">
  ): Promise<Omit<Section, "id"> | null>;

  updateSection(id: string, section: Section): Promise<Section | null>;
}
