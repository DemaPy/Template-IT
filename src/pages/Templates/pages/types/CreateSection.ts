type TCreateSection = {
  template_id: Template["id"];
};

type CreateSectionFormProps = {
  isOpen: boolean;
  setClose: () => void;
  template_id: string;
};
