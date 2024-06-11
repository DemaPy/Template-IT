import Sidebar from './Sidebar'
import TemplateBuilder from './TemplateBuilder'



const ComponentHandler = ({ component }: {
  component: Component
}) => {

  return (
    <div className="flex gap-4 mt-6">
      <Sidebar components={[component]} />
      <TemplateBuilder components={[component]} />
    </div>
  )
}

export default ComponentHandler