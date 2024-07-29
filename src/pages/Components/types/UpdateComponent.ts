type TUpdateComponent = {
  isOpen: boolean;
  setClose: () => void;
  component_id: Component["id"];
};

type TFetchComponentToUpdate = {
  component_id: Component["id"];

  setTitle: (value: Component["title"]) => void;
  title: Component["title"];

  handleEditorSubmit: (value: EditorOnSubmitProps) => void;
  handleSubmit: ({
    old_title,
    old_content,
  }: {
    old_title: Component["title"];
    old_content: Component["content"];
  }) => void;
};
