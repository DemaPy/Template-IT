export type TUpdateSection = {
  setClose: () => void;
  isOpen: boolean;
  section_id: Section["id"];
  template_id: Template["id"];
};

export type TFetchSectionToUpdate = {
  section_id: Section["id"];
  template_id: Template['id']
};

export type UpdateFormProps = {
  section: Section;
  template_id: Template['id']
};
