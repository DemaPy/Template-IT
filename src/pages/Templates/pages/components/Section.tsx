import Heading from '@/components/Heading'
import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { TemplateService } from '@/services/DI/Template'
import { usePlaceholderCreateModal } from '@/store/placeholderCreateModal'
import { useSectionCreateModal } from '@/store/sectionCreateModal'
import { useSectionUpdateModal } from '@/store/sectionUpdateModal'
import { ChevronDown, ChevronUpIcon, CopyIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Props = {
  item: Section
  template_id: string
}

const Section = ({ item }: Props) => {
  // Problem???
  const setSectionCreate = useSectionCreateModal(state => state.setSection)

  const [loading, setLoading] = useState(false)

  const [isOpen, setIsOpenTextArea] = useState(false)
  const setIsOpen = useSectionUpdateModal(state => state.setOpen)
  const setSection = useSectionUpdateModal(state => state.setSection)
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const setIsPlaceholderOpen = usePlaceholderCreateModal(state => state.setOpen)
  const setPlaceholder = usePlaceholderCreateModal(state => state.setPlaceholder)

  const handleClick = () => {
    setIsOpen()
    setSection(item)
  }


  useEffect(() => {
    if (!ref.current) return

    const handleClick = (ev: MouseEvent) => {
      if (ev.ctrlKey && ev.target) {
        setSection(item)
        setPlaceholder((ev.target as HTMLTextAreaElement).selectionStart)
        setIsPlaceholderOpen()
      }
    }

    ref.current.addEventListener("click", handleClick)
    return () => {
      if (!ref.current) return
      ref.current.removeEventListener("click", handleClick)
    }
  }, [isOpen])

  const handleDeleteSection = async () => {
    setLoading(true)
    const response = await TemplateService.deleteSection(item.id)
    if (response.status === "error") {
      alert(response.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setSectionCreate(response.data!)
  }

  const handleDeletePlaceholder = async (placeholder_id: Placeholder["id"]) => {
    setLoading(true)
    const response = await TemplateService.deletePlaceholder(placeholder_id)
    if (response.status === "error") {
      alert(response.message)
      setLoading(false)
      return
    }
    setLoading(false)
    if (response.data) {
      setSectionCreate({...item, placeholders: [...item.placeholders, response.data]})
    }
  }

  const handleDuplicate = async () => {
    setLoading(true)
    const response = await TemplateService.duplicateSection(item.id)
    if (response.status === "error") {
      alert(response.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setSectionCreate(response.data!)
  }

  const actions = [{
    icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />,
    onClick: () => setIsOpenTextArea(!isOpen)
  }, {
    icon: <TrashIcon className='w-4 h-4 text-red-400' />,
    onClick: handleDeleteSection
  },
  {
    icon: <CopyIcon className='w-4 h-4 text-blue-400' />,
    onClick: handleDuplicate,
    isLoading: loading
  }]

  const addPlaceholdersToContent = () => {
    return item.content
  }

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-4'>
      <Heading title={item.title} actions={actions} size='xs' action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: handleClick }} />
      {isOpen && <Textarea ref={ref} defaultValue={addPlaceholdersToContent()} className='resize-none w-full min-h-60 max-h-72' />}
      {item?.placeholders && item?.placeholders.length > 0 && <Title title={"Placeholders"} size='xs' />}
      {item.placeholders && (
        item.placeholders.map(item => (
          <div className='flex justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm" >Name: {item.title} | Position: {item.position}</p>
            <Button variant={"ghost"} onClick={() => handleDeletePlaceholder(item.id)} size={"icon"}> <TrashIcon className='w-4 h-4' /> </Button>
          </div>
        ))
      )}
    </li>
  )
}

export default Section