import { Delete } from "../actions/Delete";
import { UpdateTemplate as Update } from "../actions/Update";

export const Actions = ({ template_id }: { template_id: Template["id"] }) => {
  return (
    <>
      <Update template_id={template_id} />
      <Delete template_id={template_id} />
    </>
  );
};
