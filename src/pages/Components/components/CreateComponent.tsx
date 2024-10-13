import { useCreateComponent } from "../pages/hooks/useComponent";
import {
  CreateContentForm,
  PayloadProps,
} from "@/components/MustacheEditor/CreateContentForm";
import ComponentUpdateSkeletonCreate from "./ComponentCreateSkeleton";

const CreateComponent = () => {
  const { isPending, mutate } = useCreateComponent();

  const handleCreate = (payload: PayloadProps) => {
    mutate(payload);
  };

  if (isPending) return <ComponentUpdateSkeletonCreate />;

  return <CreateContentForm isPending={isPending} onSubmit={handleCreate} />;
};

export default CreateComponent;
