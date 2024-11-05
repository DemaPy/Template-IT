import { useCreateComponent } from "../pages/hooks/useComponent";
import {
  CreateContentForm,
  PayloadProps,
} from "@/components/MustacheEditor/CreateContentForm";
import DOMPurify from "dompurify";

const CreateComponent = () => {
  const { isPending, mutate } = useCreateComponent();

  const handleCreate = (payload: PayloadProps) => {
    const clean = DOMPurify.sanitize(payload.content, {
      ADD_TAGS: ["style"],
      FORCE_BODY: true,
    });
    const clearBrs = clean.replace(/\n/g, "")
    mutate({
      ...payload,
      content: clearBrs,
    });
  };

  return <CreateContentForm isPending={isPending} onSubmit={handleCreate} />;
};

export default CreateComponent;
