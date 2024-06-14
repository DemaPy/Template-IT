import Heading from '@/components/Heading'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ComponentService } from '@/services/DI/Component'
import { useComponentUpdateModal } from '@/store/componentUpdateModal'
import { usePlaceholderCreateModal } from '@/store/placeholderCreateModal'
import { ChevronDown, ChevronUpIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  item: Component
}

const Component = ({ item }: Props) => {
  const [isOpen, setIsOpenTextArea] = useState(false)
  const setIsOpen = useComponentUpdateModal(state => state.setOpen)
  const setComponent = useComponentUpdateModal(state => state.setComponent)
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const setIsPlaceholderOpen = usePlaceholderCreateModal(state => state.setOpen)
  const setPlaceholder = usePlaceholderCreateModal(state => state.setPlaceholder)

  const handleClick = () => {
    setIsOpen()
    setComponent(item)
    setIsOpenTextArea(false)
  }

  useEffect(() => {
    if (!ref || !ref.current) return

    const handleClick = (ev: MouseEvent) => {
      if (ev.ctrlKey && ev.target) {
        setComponent(item)
        setPlaceholder((ev.target as HTMLTextAreaElement).selectionStart)
        setIsPlaceholderOpen()
      }
    }

    ref.current.addEventListener("click", handleClick)
    return () => {
      if (!ref || !ref.current) return
      ref.current.removeEventListener("click", handleClick)
    }
  }, [isOpen])

  const handleDeleteClick = async (placeholderId: Placeholder['id'], componentId: Component['id']) => {
    const response = await ComponentService.deletePlaceholder(placeholderId, componentId)
    if (response.status === "error") {
      alert(response.message)
      return
    } else {
      setComponent(response.data)
    }
  }

  const actions = [{
    icon: isOpen ? <ChevronUpIcon className='w-4 h-4 mr-2' /> : <ChevronDown className='w-4 h-4 mr-2' />,
    title: "Show content",
    onClick: () => setIsOpenTextArea(!isOpen)
  }]

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-4'>
      <Heading title={item.title} actions={actions} size='xs' action={{ icon: <Edit2Icon className='w-4 h-4 mr-2 text-yellow-400' />, title: "Edit", onClick: handleClick }} />
      {isOpen && <Textarea ref={ref} defaultValue={item.content} className='resize-none w-full min-h-60 max-h-72' />}
      {item.placeholders && <Title title={"Placeholders"} size='xs' />}
      {item.placeholders && (
        item.placeholders.map(item => (
          <div className='flex justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm" >Name: {item.title} | Position: {item.position}</p>
            <Button variant={"ghost"} onClick={() => handleDeleteClick(item.id, item.componentId!)} size={"icon"}> <TrashIcon className='w-4 h-4' /> </Button>
          </div>
        ))
      )}
    </li>
  )
}

export default Component