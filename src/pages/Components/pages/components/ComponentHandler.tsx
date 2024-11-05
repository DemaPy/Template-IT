import Sidebar from './Sidebar'
import TemplateBuilder from './TemplateBuilder'



const ComponentHandler = ({ component }: {
  component: Component
}) => {

  return (
    <div className="flex lg:flex-row flex-col flex-grow gap-4">
      <Sidebar components={[component]} />
      <TemplateBuilder components={[component]} />
    </div>
  )
}

export default ComponentHandler