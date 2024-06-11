import { Switchh } from '@/components/Switch'
import Title from '@/components/Title'
import React from 'react'

type Props = {
    slugs: {[key: string]: boolean}
    onChange: (isSlugActive: {[key: string]: boolean}) => void
}

const SectionSlugs = ({
    onChange,
    slugs
}: Props) => {

    const generateSlugs = (data: {[key: string]: boolean}) => {
        const elements: React.ReactElement[] = []
        for (const key in data) {
            const isSlugActive = data[key];
            elements.push(<div key={key} className='flex justify-between rounded-sm p-2 gap-4 items-center bg-slate-50'>
                <Title size='xs' title={key} />
                <Switchh text={isSlugActive ? "On" : "Off"} isActive={isSlugActive} onChange={(isActive) => onChange({[key]: isActive})} />
            </div>)
        }
        return elements
    }
  return (
    <div className='flex flex-col gap-2 ml-14 mr-20'>
        {generateSlugs(slugs)}
    </div>
  )
}

export default SectionSlugs