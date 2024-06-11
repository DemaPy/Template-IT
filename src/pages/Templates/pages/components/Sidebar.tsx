import ListView from '@/components/List'
import Section from './Section'
import CreateSectionFromComponent from './CreateSectionFromComponent'
import CreateSection from './CreateSection'
import UpdateSection from './UpdateSection'
import CreatePlaceholder from '@/pages/Templates/pages/components/CreatePlaceholder'
import { useEffect, useState } from 'react'
import { ComponentService } from '@/services/DI/Component'

type Props = {
  sections: Section[] | null
  template_id: string
}

const Sidebar = ({ sections, template_id }: Props) => {
  const [components, setComponents] = useState<Component[] | null>(null)

  useEffect(() => {
    (async () => {
      const response = await ComponentService.getAll()
      if (response.error instanceof Error) {
        alert(response.message)
        return
      }
      setComponents(response.data)
    })()
  }, [])

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      <div className='flex gap-2 items-center'>
        <CreateSection template_id={template_id} />
        {components && components.length > 0 && (
          <CreateSectionFromComponent template_id={template_id} components={components} />
        )}
      </div>
      <UpdateSection />
      <CreatePlaceholder />
      <ListView component={Section} items={sections} />
    </div>
  )
}

export default Sidebar