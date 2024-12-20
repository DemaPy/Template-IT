import Sidebar from "./Sidebar";
import TemplateBuilder from "./TemplateBuilder";

type Props = {
  template: Template;
};

const TemplateHandler = ({ template }: Props) => {
  return (
    <div className="flex lg:flex-row flex-col flex-grow gap-4">
      <Sidebar template_id={template.id} sections={template.sections} />
      <TemplateBuilder sections={template.sections} />
    </div>
  );
};

export default TemplateHandler;
