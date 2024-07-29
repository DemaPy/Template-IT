type TUpdateSection = {
  setClose: () => void;
  isOpen: boolean;
  section_id: Section["id"];
  template_id: Template["id"];
};

type TFetchSectionToUpdate = {
  section_id: Section["id"];

  title: Section["title"];
  handleSubmit: ({
    old_title,
    old_content,
  }: {
    old_title: Section["title"];
    old_content: Section["content"];
  }) => void;

  setTitle: (value: Section["title"]) => void;
  handleEditorSubmit: (value: EditorOnSubmitProps) => void;
};
