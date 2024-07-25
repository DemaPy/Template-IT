import Sidebar from './Sidebar'
import TemplateBuilder from './TemplateBuilder'

type Props = {
  template: Template
}

const TemplateHandler = ({ template }: Props) => {

  return (
    <div className="flex flex-grow gap-4 mt-6">
      <Sidebar template_id={template.id} sections={template.sections} />
      <TemplateBuilder sections={template.sections} />
    </div>
  )
}

export default TemplateHandler