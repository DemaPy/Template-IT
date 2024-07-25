import Title from "@/components/Title"
import { Link } from "react-router-dom"

type Props = {
  item: Template
}

const TemplateCard = ({ item }: Props) => {
  return (
    <div className="p-2 border rounded-md">
      <Link to={"/templates/" + item.id}>
        <Title size="xs" title={item.title} />
      </Link>
    </div>
  )
}

export default TemplateCard