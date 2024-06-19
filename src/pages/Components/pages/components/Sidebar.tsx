import ListView from '@/components/List'
import Component from './Component'
import CreatePlaceholder from './CreatePlaceholder'
import { usePlaceholderCreateModal } from '@/store/placeholderCreateModal'

type Props = {
  components: Array<Component>
}

const Sidebar = ({ components }: Props) => {
  const isOpen = usePlaceholderCreateModal(state => state.isOpen)

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      {isOpen && (
        <CreatePlaceholder />
      )}
      <ListView component={Component} items={components} />
    </div>
  )
}

export default Sidebar
