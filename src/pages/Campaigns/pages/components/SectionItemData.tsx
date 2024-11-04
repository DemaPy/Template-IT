import Heading from '@/components/Heading'
import { ChevronDown, ChevronUpIcon } from 'lucide-react'
import React, { useState } from 'react'
import { DataToReturn } from './Section'
import Title from '@/components/Title'
import { Input } from '@/components/ui/input'

type Props = {
    placeholder: DataToReturn[0]
}

const SectionItemData = ({ placeholder }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const generateData = (data: DataToReturn[0]['data']) => {
        const elements: React.ReactElement[] = []
        for (const key in data) {
            const placeholderData = data[key];
            elements.push(<div key={key} className='grid grid-cols-4 items-center'>
                <Title size='xxs' title={key} />
                <Input disabled className='col-span-3' defaultValue={placeholderData} />
            </div>)
        }
        return elements
    }
    
    return (
        <div>
            <Heading
                title={placeholder.title} size='xxs'
                action={{
                    isLoading: !placeholder.data,
                    icon: isOpen ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />,
                    title: "Show content",
                    onClick: () => setIsOpen(!isOpen)
                }} />
            {
                isOpen && (
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        {generateData(placeholder.data)}
                    </div>
                )
            }
        </div>
    )
}

export default SectionItemData