import UpdateDialog from "../Update/UpdateDialog";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

type UpdateProps = {
  template_id: Template["id"];
  section_id: Section["id"];
};

export const Update = ({ template_id, section_id }: UpdateProps) => {
  return (
    <DialogProvider>
      <UpdateDialog section_id={section_id} template_id={template_id} />
    </DialogProvider>
  );
};

type DialogContextProps = {
  isOpen: boolean;
  setClose: () => void;
  setOpen: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>
};
const DialogContext = createContext<DialogContextProps>({
  isOpen: false,
  setClose: () => undefined,
  setOpen: () => undefined,
  setIsOpen: () => undefined,
});

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  return context;
};

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = {
    isOpen,
    setIsOpen: setIsOpen,
    setOpen: () => setIsOpen(true),
    setClose: () => setIsOpen(false),
  };
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
};
