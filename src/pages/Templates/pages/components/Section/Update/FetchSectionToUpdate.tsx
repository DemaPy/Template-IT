import { useFetchSection } from "../../../hooks/useSection";
import UpdateForm from "./UpdateForm";
import type { FetchSectionToUpdateProps } from "../../../types/UpdateSection";
import SectionUpdateSkeleton from "./SectionSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function FetchSectionToUpdate({
  section_id,
  template_id,
}: FetchSectionToUpdateProps) {
  const { isPending, data, isError, error } = useFetchSection(section_id);

  useEffect(() => {
    if (isError) {
      toast.error((error as Error).message);
    }
  }, [isError, error]);
  if (isPending) return <SectionUpdateSkeleton />;
  if (isError) return null;

  return <UpdateForm section={data.data} template_id={template_id} />;
}
