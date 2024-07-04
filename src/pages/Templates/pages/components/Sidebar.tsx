import ListView from '@/components/List'
import Section from './Section/Section'
import CreateSection from './Section/CreateSection'
import UpdateSection from './Section/UpdateSection'
import { useEffect, useState } from 'react'
import ComponentSelect from './ComponentSelect'
import { SectionService } from '@/services/DI/Section'
import { handleResponse } from '@/utils/handleResponse'
import { useLocation, useNavigate } from 'react-router-dom'
import UpdatePlaceholder from '@/pages/Components/pages/components/UpdatePlaceholder'

type Props = {
  sections: Section[] | null
  template_id: string
}

const Sidebar = ({ sections, template_id }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [componentId, setComponentId] = useState("")

  useEffect(() => {
    if (!componentId) return
    (async () => {
      const response = await SectionService.createFromComponent({ componentId, templateId: template_id });
      const parsed = handleResponse<Section>(response, location, navigate);
      if (parsed) {
        console.log(parsed.data);
      } else {
        navigate("/templates");
      }
    })();
  }, [componentId]);

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      <div className='flex gap-2 items-center sticky top-0'>
        <CreateSection template_id={template_id} />
        <ComponentSelect component_id={componentId} setComponent={setComponentId} />
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