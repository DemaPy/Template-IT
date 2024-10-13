import { FetchSectionToUpdate } from "./FetchSectionToUpdate";
import type { UpdateSectionProps } from "../../../types/UpdateSection";

const UpdateSection = ({ section_id, template_id }: UpdateSectionProps) => {
  return (
    <FetchSectionToUpdate section_id={section_id} template_id={template_id} />
  );
};

export default UpdateSection;
