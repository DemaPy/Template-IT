import Heading from '@/components/Heading'
import { Editor } from '@/pages/Templates/pages/components/Section/Editor'
import { ComponentService } from '@/services/DI/Component'
import { useComponentUpdateModal } from '@/store/componentUpdateModal'
import { handleResponse } from '@/utils/handleResponse'
import { ChevronDown, ChevronUpIcon, Edit2Icon } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  item: Component
}

const Component = ({ item }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const [isOpen, setIsOpenTextArea] = useState(false)
  const setIsOpen = useComponentUpdateModal(state => state.setOpen)
  const setComponent = useComponentUpdateModal(state => state.setComponent)

  const handleEdit = () => {
    setIsOpen()
    setComponent(item)
    setIsOpenTextArea(false)
  }

  const handleDeleteClick = async (placeholderId: Placeholder['id']) => {
    setLoading(true)
    const response = await ComponentService.deletePlaceholder(placeholderId)
    const parsed = handleResponse<Component>(response, location, navigate)
    setLoading(false)
    if (parsed) {
      setComponent(parsed.data!)
    }
  }

  const actions = [{
    icon: isOpen ? <ChevronUpIcon className='w-4 h-4 mr-2' /> : <ChevronDown className='w-4 h-4 mr-2' />,
    title: "Show content",
    onClick: () => setIsOpenTextArea(!isOpen)
  }]

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-4'>
      <Heading title={item.title} actions={actions} size='xs' action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: handleEdit }} />
      {isOpen && <Editor PlaceholderService={ComponentService} item={item} content={item.content} />}
    </li>
  )
}

export default Component