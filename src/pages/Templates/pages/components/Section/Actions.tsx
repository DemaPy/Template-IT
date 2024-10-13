import { Update } from "./Actions/Update";
import { Copy } from "./Actions/Copy";
import { Delete } from "./Actions/Delete";

type ActionsProps = {
  template_id: Template["id"];
  section_id: Section["id"];
};
export const Actions = ({ template_id, section_id }: ActionsProps) => {
  return (
    <div className="flex gap-2">
      <Copy template_id={template_id} section_id={section_id} />
      <Update template_id={template_id} section_id={section_id} />
      <Delete template_id={template_id} section_id={section_id} />
    </div>
  );
};
