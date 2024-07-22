import Heading from '@/components/Heading'
import { Editor } from '@/pages/Templates/pages/components/Section/Editor'
import Placeholders from '@/pages/Templates/pages/components/Section/Placeholders'
import { ComponentService } from '@/services/DI/Component'
import { useComponentUpdateModal } from '@/store/componentUpdateModal'
import { ChevronDown, ChevronUpIcon, Edit2Icon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  item: Component
}

const Component = ({ item }: Props) => {
  const [isOpen, setIsOpenTextArea] = useState(false)
  const setIsOpen = useComponentUpdateModal(state => state.setOpen)

  const handleEdit = () => {
    setIsOpen()
    setIsOpenTextArea(false)
  }

  const actions = [{
    icon: isOpen ? <ChevronUpIcon className='w-4 h-4 mr-2' /> : <ChevronDown className='w-4 h-4 mr-2' />,
    title: "Show content",
    onClick: () => setIsOpenTextArea(!isOpen)
  }]

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-4'>
      <Heading title={item.title} actions={actions} size='xs' action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: handleEdit }} />
      {isOpen && (
        <>
          <Editor PlaceholderService={ComponentService} item={item} content={item.content} />
          <Placeholders placeholders={item.placeholders} />
        </>
      )}

    </li>
  )
}

export default Component