import Heading from '@/components/Heading'
import Placeholders from '@/components/Placeholders'
import { ChevronDown, ChevronUpIcon } from 'lucide-react'
import { useState } from 'react'

type Props = {
  item: Component
}

const Component = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className='w-full flex flex-col gap-4 border rounded-md p-2 bg-white'>
      <Heading title={item.title} size='xs' action={{
        icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />,
        onClick: () => setIsOpen(!isOpen)
      }} />
      {isOpen && (
        <Placeholders invalidate_key={item.id} service={"component"} placeholders={item.placeholders} />
      )}
    </li>
  )
}

export default Component