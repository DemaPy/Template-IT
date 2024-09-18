import { ErrorPage } from "@/pages/Error/Error";
import { useFetchSection } from "../../../hooks/useSection";
import UpdateForm from "./UpdateForm";
import type { TFetchSectionToUpdate } from "../../../types/UpdateSection";
import SectionUpdateSkeleton from "./SectionSkeleton";

export function FetchSectionToUpdate({
  section_id,
  template_id,
}: TFetchSectionToUpdate) {
  const { isPending, data, isError, error } = useFetchSection(section_id);

  if (isPending) return <SectionUpdateSkeleton />;

  if (isError) {
    return (
      <ErrorPage error={error} message={error.message} path="/templates" />
    );
  }

  return <UpdateForm section={data.data} template_id={template_id} />;
}
