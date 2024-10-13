export type UpdateSectionProps = {
  section_id: Section["id"];
  template_id: Template["id"];
};

export type FetchSectionToUpdateProps = {
  section_id: Section["id"];
  template_id: Template["id"];
};

export type UpdateFormProps = {
  section: Section;
  template_id: Template["id"];
};
