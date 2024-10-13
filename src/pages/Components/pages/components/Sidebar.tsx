import ListView from '@/components/List'
import Component from './Component'

type Props = {
  components: Array<Component>
}

const Sidebar = ({ components }: Props) => {

  return (
    <div data-test-id="component-sidebar" className='lg:w-3/4 w-full relative max-h-[80vh] overflow-y-auto'>
      <ListView component={Component} items={components} />
    </div>
  )
}

export default Sidebar
