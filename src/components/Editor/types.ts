type EditorProps = {
  content: EditorOnSubmitProps["content"];
  isLoading: boolean,
  isContentEditable: boolean;
  onSubmit: (data: EditorOnSubmitProps) => void;
  placeholders: EditorOnSubmitProps["placeholdersToCreate"];
};

type EditorOnSubmitProps = {
  content: string;
  placeholdersToCreate: Placeholder[];
  placeholdersToDelete: Placeholder[];
};

type PlaceholderNodeProps = {
  title: string;
  id: string;
  clickEventHandler: (ev: MouseEvent) => void
};

type IsPlaceholdersChanged = {
    html: string,
    placehodlers: EditorOnSubmitProps['placeholdersToCreate']
}