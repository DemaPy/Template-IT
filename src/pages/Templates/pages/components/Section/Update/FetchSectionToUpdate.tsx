import { useFetchSection } from "../../../hooks/useSection";
import type { FetchSectionToUpdateProps } from "../../../types/UpdateSectionTypes";
import SectionUpdateSkeleton from "./SectionSkeleton";
import { useEffect } from "react";
import toast from "react-hot-toast";
import UpdateForm from "./UpdateForm";
import SectionFetchError from "./SectionFetchError";

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
  if (isError) return <SectionFetchError />;

  return <UpdateForm template_id={template_id} data={data.data} />;
}
