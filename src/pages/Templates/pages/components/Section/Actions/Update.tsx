import UpdateDialog from "../Update/UpdateDialog";

type UpdateProps = {
  template_id: Template["id"];
  section_id: Section["id"];
};

export const Update = ({ template_id, section_id }: UpdateProps) => {
  return <UpdateDialog section_id={section_id} template_id={template_id} />;
};
