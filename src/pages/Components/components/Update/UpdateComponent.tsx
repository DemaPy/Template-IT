import { FetchComponentToUpdate } from "./FetchComponentToUpdate";

const UpdateComponent = ({ component_id }: TUpdateComponent) => {
  return <FetchComponentToUpdate componet_id={component_id} />;
};

export default UpdateComponent;
