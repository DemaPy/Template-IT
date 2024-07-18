import ListView from '@/components/List'
import Section from './Section/Section'
import CreateSection from './Section/CreateSection'
import UpdateSection from './Section/UpdateSection'
import ComponentSelect from './ComponentSelect'
import { SectionService } from '@/services/DI/Section'
import UpdatePlaceholder from '@/pages/Components/pages/components/UpdatePlaceholder'

type Props = {
  sections: Section[] | null
  template_id: string
}

const Sidebar = ({ sections, template_id }: Props) => {

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      <div className='flex gap-2 items-center sticky top-0'>
        <CreateSection template_id={template_id} />
        <ComponentSelect template_id={template_id} />
      </div>
      <UpdateSection />
      <UpdatePlaceholder Service={SectionService} />
      <div className='mt-4'>
        <ListView component={Section} items={sections} />
      </div>
    </div>
  )
}

export default Sidebar