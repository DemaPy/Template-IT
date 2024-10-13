import SectionUpdateSkeletonCreate from "../SectionUpdateSkeletonCreate";
import { useCreateSection } from "../../../hooks/useSection";
import type { CreateSectionFormProps } from "../../../types/CreateSection";
import {
  CreateContentForm,
  PayloadProps,
} from "@/components/MustacheEditor/CreateContentForm";

export const CreateSection = ({ template_id }: CreateSectionFormProps) => {
  const { isPending, mutate } = useCreateSection({
    invalidate_key: template_id,
  });

  const handleCreate = (payload: PayloadProps) => {
    mutate({
      ...payload,
      templateId: template_id,
    });
  };

  if (isPending) return <SectionUpdateSkeletonCreate />;

  return <CreateContentForm isPending={isPending} onSubmit={handleCreate} />;
};
