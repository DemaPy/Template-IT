import { Delete } from "./Delete/Delete";
import UpdateComponent from "./Update/UpdateComponent";

export const Actions = ({ component_id }: { component_id: Component["id"] }) => {
  return (
    <>
      <UpdateComponent component_id={component_id} />
      <Delete component_id={component_id} />
    </>
  );
};
