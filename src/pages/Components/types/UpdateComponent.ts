type TUpdateComponent = {
  isOpen: boolean;
  setClose: () => void;
  component_id: Component["id"];
};

type UpdateFormProps = {
  component: Component;
  setClose: () => void;
};

type TFetchComponentToUpdate = {
  componet_id: Component["id"];
  setClose: () => void;
};
