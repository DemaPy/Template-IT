import Sidebar from './Sidebar'
import TemplateBuilder from './TemplateBuilder'



const ComponentHandler = ({ component }: {
  component: Component
}) => {

  return (
    <div className="flex lg:flex-row flex-col gap-4 mt-6 flex-grow">
      <Sidebar components={[component]} />
      <TemplateBuilder components={[component]} />
    </div>
  )
}

export default ComponentHandler