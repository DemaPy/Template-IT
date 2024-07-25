import ListView from '@/components/List'
import Component from './Component'
import UpdatePlaceholder from './UpdatePlaceholder'
import { ComponentService } from '@/services/DI/Component'

type Props = {
  components: Array<Component>
}

const Sidebar = ({ components }: Props) => {

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      <UpdatePlaceholder Service={ComponentService} />
      <ListView component={Component} items={components} />
    </div>
  )
}

export default Sidebar
