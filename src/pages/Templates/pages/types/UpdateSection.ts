type TUpdateSection = {
  setClose: () => void;
  isOpen: boolean;
  section_id: Section["id"];
  template_id: Template["id"];
};

type TFetchSectionToUpdate = {
  section_id: Section["id"];

  setTitle: (value: Section["title"]) => void;
  title: Section["title"];
  handleEditorSubmit: (value: EditorOnSubmitProps) => void;
};
