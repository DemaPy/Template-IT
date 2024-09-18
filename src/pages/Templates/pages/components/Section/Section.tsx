import Heading from '@/components/Heading'
import { ChevronDown, ChevronUpIcon, CopyIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import Placeholders from '../../../../../components/Placeholders'
import { useState } from 'react'
import { useDeleteSection, useDuplicate } from '../../hooks/useSection'
import UpdateSection from './Update/UpdateSection'
import { ErrorPage } from '@/pages/Error/Error'

type Props = {
  item: Section
  template_id: string
}

const Section = ({ item }: Props) => {
  const [isOpen, setIsOpenTextArea] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { mutate, isPending: isDeleting, isError: isDeletingError, error: deletingError } = useDeleteSection({ invalidate_key: item.templateId })
  const { mutate: duplicate, isPending: isDuplicating, isError: isDuplicatingError, error: duplicatingError } = useDuplicate({ invalidate_key: item.templateId })



  const actions = item.placeholders.length > 0 ? [
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
      onClick: () => duplicate({ id: item.id }),
      isLoading: isDuplicating || isDeleting
    }] : [
    {
      icon: <TrashIcon className='w-4 h-4 text-red-400' />,
      onClick: () => mutate({ id: item.id }),
      isLoading: isDeleting
    },
    {
      icon: <CopyIcon className='w-4 h-4 text-blue-400' />,
      onClick: () => duplicate({ id: item.id }),
      isLoading: isDuplicating || isDeleting
    }]

  if (isDeletingError) {
    return <ErrorPage error={deletingError} message={deletingError.message} path={`/templates/${item.templateId}`} />
  }

  if (isDuplicatingError) {
    return <ErrorPage error={duplicatingError} message={duplicatingError.message} path={`/templates/${item.templateId}`} />
  }

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-2 bg-white'>
      {
        isEditOpen && (
          <UpdateSection isOpen={isEditOpen} setClose={() => setIsEditOpen(false)} section_id={item.id} template_id={item.templateId} />
        )
      }
      <Heading
        title={item.title}
        actions={actions}
        size='xs'
        action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: () => setIsEditOpen(true), isLoading: isDeleting }}
      />
      {isOpen && (
        <Placeholders invalidate_key={item.templateId} service={"section"} placeholders={item.placeholders} />
      )}
    </li>
  )
}

export default Section