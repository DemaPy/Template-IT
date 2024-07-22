import Heading from '@/components/Heading'
import { useSectionCreateModal } from '@/store/sectionCreateModal'
import { useSectionUpdateModal } from '@/store/sectionUpdateModal'
import { handleResponse } from '@/utils/handleResponse'
import { ChevronDown, ChevronUpIcon, CopyIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import Placeholders from './Placeholders'
import { Editor } from './Editor'
import { SectionService } from '@/services/DI/Section'
import { useState } from 'react'
import { useDeleteSection, useFetchSection } from '../../hooks/useSection'
import toast from 'react-hot-toast'
import UpdateSection from './UpdateSection'
import ComponentsSkeleton from '@/pages/Components/components/Skeleton'
import Error from '@/pages/Error/Error'

type Props = {
  item: Section
  template_id: string
}

const Section = ({ item }: Props) => {
  const { mutate, isPending: isDeleting, isError, error } = useDeleteSection({ invalidate_key: item.templateId })

  const location = useLocation()
  const navigate = useNavigate()
  // Problem???
  const setSectionCreate = useSectionCreateModal(state => state.setSection)

  const { isPending: isFetching, data, isError: isFetchingError, error: fetchError } = useFetchSection(item.id)

  const [loading, setLoading] = useState(false)

  const [isOpen, setIsOpenTextArea] = useState(false)
  const setIsOpen = useSectionUpdateModal(state => state.setOpen)
  const setSection = useSectionUpdateModal(state => state.setSection)

  const handleClick = () => {
    setIsOpen()
    setSection(item)
  }

  const handleDuplicate = async () => {
    setLoading(true)
    const response = await SectionService.duplicate({ id: item.id })
    const parsed = handleResponse<Section>(response, location, navigate)
    if (parsed) {
      setSectionCreate(parsed.data)
    }
    setLoading(false)
  }

  const actions = [
    {
      isLoading: isDeleting,
      icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />,
      onClick: () => setIsOpenTextArea(!isOpen)
    },
    {
      icon: <TrashIcon className='w-4 h-4 text-red-400' />,
      onClick: () => mutate({ id: item.id }),
      isLoading: isDeleting
    },
    {
      icon: <CopyIcon className='w-4 h-4 text-blue-400' />,
      onClick: handleDuplicate,
      isLoading: loading || isDeleting
    }]

  if (isError) {
    toast.error(error.message)
  }

  if (isFetching) return <ComponentsSkeleton />

  if (isFetchingError) {
    toast.error(fetchError.message);
    return <Error error={error} message={fetchError.message} path={`/templates/${item.templateId}`} />
  }

  if (!data) {
    toast.error("Unexpected error happend.");
  }

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-4'>
      <UpdateSection section={data.data} template_id={item.templateId} />
      <Heading
        title={item.title}
        actions={actions}
        size='xs'
        action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: handleClick, isLoading: isFetching || isDeleting }}
      />
      {isOpen && (
        <>
          <Editor PlaceholderService={SectionService} item={item} content={item.content} />
          <Placeholders placeholders={item.placeholders} />
        </>
      )}
    </li>
  )
}

export default Section