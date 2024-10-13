import SectionUpdateSkeletonCreate from "../SectionUpdateSkeletonCreate";
import { useCreateSection } from "../../../hooks/useSection";
import type { CreateSectionFormProps } from "../../../types/CreateSection";
import {
  CreateContentForm,
  PayloadProps,
} from "@/components/MustacheEditor/CreateContentForm";
import DOMPurify from "dompurify";

export const CreateSection = ({ template_id }: CreateSectionFormProps) => {
  const { isPending, mutate } = useCreateSection({
    invalidate_key: template_id,
  });

  const handleCreate = (payload: PayloadProps) => {
    const clean = DOMPurify.sanitize(payload.content, {
      ADD_TAGS: ["style"],
      FORCE_BODY: true,
    });
    const clearBrs = clean.replace(/\n/g, "");
    mutate({
      ...payload,
      templateId: template_id,
      content: clearBrs,
    });
  };

  if (isPending) return <SectionUpdateSkeletonCreate />;

  return <CreateContentForm isPending={isPending} onSubmit={handleCreate} />;
};
