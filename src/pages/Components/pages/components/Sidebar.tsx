import ListView from '@/components/List'
import Component from './Component'

type Props = {
  sections: Array<Section | Component> | null
}

const Sidebar = ({ sections }: Props) => {

  return (
    <div className='w-3/4 relative max-h-[80vh] overflow-y-auto'>
      <ListView component={Component} items={sections} />
    </div>
  )
}

export default Sidebar