import Heading from '@/components/Heading'
import { Textarea } from '@/components/ui/textarea'
import { TemplateService } from '@/services/DI/Template'
import { useSectionCreateModal } from '@/store/sectionCreateModal'
import { useSectionUpdateModal } from '@/store/sectionUpdateModal'
import { handleResponse } from '@/utils/handleResponse'
import { ChevronDown, ChevronUpIcon, CopyIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Placeholders from './Placeholders'
import { Editor } from './Editor'
import { SectionService } from '@/services/DI/Section'

type Props = {
  item: Section
  template_id: string
}

const Section = ({ item }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  // Problem???
  const setSectionCreate = useSectionCreateModal(state => state.setSection)

  const [loading, setLoading] = useState(false)

  const [isOpen, setIsOpenTextArea] = useState(false)
  const setIsOpen = useSectionUpdateModal(state => state.setOpen)
  const setSection = useSectionUpdateModal(state => state.setSection)

  const handleClick = () => {
    setIsOpen()
    setSection(item)
  }


  const handleDeleteSection = async () => {
    setLoading(true)
    const response = await TemplateService.deleteSection(item.id)
    const parsed = handleResponse<Section>(response, location, navigate)
    setLoading(false)
    if (parsed) {
      setSectionCreate(parsed.data)
    }
    setLoading(false)
  }

  const handleDeletePlaceholder = async (placeholder_id: Placeholder["id"]) => {
    setLoading(true)
    const response = await TemplateService.deletePlaceholder(placeholder_id)
    const parsed = handleResponse<Placeholder>(response, location, navigate)
    if (parsed) {
      setSectionCreate({ ...item, placeholders: [...item.placeholders, parsed.data] })
    }
    setLoading(false)
  }

  const handleDuplicate = async () => {
    setLoading(true)
    const response = await TemplateService.duplicateSection(item.id)
    const parsed = handleResponse<Section>(response, location, navigate)
    if (parsed) {
      setSectionCreate(parsed.data)
    }
    setLoading(false)
  }

  const actions = [
    {
      icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />,
      onClick: () => setIsOpenTextArea(!isOpen)
    },
    {
      icon: <TrashIcon className='w-4 h-4 text-red-400' />,
      onClick: handleDeleteSection,
      isLoading: loading
    },
    {
      icon: <CopyIcon className='w-4 h-4 text-blue-400' />,
      onClick: handleDuplicate,
      isLoading: loading
    }]

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-4'>
      <Heading title={item.title} actions={actions} size='xs' action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: handleClick }} />
      {isOpen && (
        <>
          <Editor PlaceholderService={SectionService} item={item} content={item.content} />
          <Placeholders handleDeletePlaceholder={handleDeletePlaceholder} placeholders={item.placeholders} />
        </>
      )}
    </li>
  )
}

export default Section