import Heading from '@/components/Heading'
import { ChevronDown, ChevronUpIcon, CopyIcon, Edit2Icon, TrashIcon } from 'lucide-react'
import Placeholders from './Placeholders'
import { useState } from 'react'
import { useDeleteSection, useDuplicate, useFetchSection } from '../../hooks/useSection'
import toast from 'react-hot-toast'
import UpdateSection from './UpdateSection'
import ComponentsSkeleton from '@/pages/Components/components/Skeleton'
import Error from '@/pages/Error/Error'

type Props = {
  item: Section
  template_id: string
}

const Section = ({ item }: Props) => {
  const [isOpen, setIsOpenTextArea] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { mutate, isPending: isDeleting, isError, error } = useDeleteSection({ invalidate_key: item.templateId })
  const { mutate: duplicate, isPending: isDuplicating, } = useDuplicate({ invalidate_key: item.templateId })

  const { isPending: isFetching, data, isError: isFetchingError, error: fetchError } = useFetchSection(item.id)

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
      onClick: () => duplicate({ id: item.id }),
      isLoading: isDuplicating || isDeleting
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
      {
        isEditOpen && (
          <UpdateSection isOpen={isEditOpen} setClose={() => setIsEditOpen(false)} section={data.data} template_id={item.templateId} />
        )
      }
      <Heading
        title={item.title}
        actions={actions}
        size='xs'
        action={{ icon: <Edit2Icon className='w-4 h-4 text-yellow-400' />, onClick: () => setIsEditOpen(true), isLoading: isFetching || isDeleting }}
      />
      {isOpen && (
        <Placeholders invalidate_key={item.templateId} service={"section"} placeholders={item.placeholders} />
      )}
    </li>
  )
}

export default Section