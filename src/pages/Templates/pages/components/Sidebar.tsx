import ListView from '@/components/List'
import Section from './Section/Section'
import CreateSection from './Section/CreateSection'
import ComponentSelect from '../../../../components/ComponentSelect'
import { useCreateFromComponent } from '../hooks/useSection'
import Error from '@/pages/Error/Error'
import ComponentsSkeleton from '@/pages/Components/components/ComponentsSkeleton'

type Props = {
  sections: Section[] | null
  template_id: string
}

const Sidebar = ({ sections, template_id }: Props) => {
  const { isPending, mutate, isError, error } = useCreateFromComponent({ invalidate_key: template_id })

  if (isPending) return <ComponentsSkeleton />

  if (isError) {
    return <Error error={error} message={error.message} path="/" />
  }
  const onSelect = (value: Component['id']) => {
    mutate({
      componentId: value,
      templateId: template_id
    })
  }

  return (
    <div className='lg:w-3/4 w-full relative max-h-[80vh] overflow-y-auto'>
      <div className='flex lg:flex-row flex-col gap-2 items-center sticky top-0'>
        <CreateSection template_id={template_id} />
        <ComponentSelect isLoading={isPending} onSelect={onSelect} />
      </div>
      <div className='mt-4'>
        <ListView component={Section} items={sections} />
      </div>
    </div>
  )
}

export default Sidebar