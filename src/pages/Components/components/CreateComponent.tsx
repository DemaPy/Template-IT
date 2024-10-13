import { useCreateComponent } from "../pages/hooks/useComponent";
import {
  CreateContentForm,
  PayloadProps,
} from "@/components/MustacheEditor/CreateContentForm";
import ComponentUpdateSkeletonCreate from "./ComponentCreateSkeleton";
import DOMPurify from "dompurify";

const CreateComponent = () => {
  const { isPending, mutate } = useCreateComponent();

  const handleCreate = (payload: PayloadProps) => {
    const clean = DOMPurify.sanitize(payload.content);
    const clearBrs = clean.replace(/\n/g, "")
    mutate({
      ...payload,
      content: clearBrs,
    });
  };

  if (isPending) return <ComponentUpdateSkeletonCreate />;

  return <CreateContentForm isPending={isPending} onSubmit={handleCreate} />;
};

export default CreateComponent;
