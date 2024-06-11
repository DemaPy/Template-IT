import ListView from '@/components/List'
import Component from './Component'
import CreatePlaceholder from './CreatePlaceholder'

type Props = {
  components: Array<Component>
}

const Sidebar = ({ components }: Props) => {

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      <CreatePlaceholder />
      <ListView component={Component} items={components} />
    </div>
  )
}

export default Sidebar