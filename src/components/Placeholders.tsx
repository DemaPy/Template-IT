import ListView from '@/components/List'
import Title from '@/components/Title'
import Placeholder from './Placeholder'

type Props = {
    placeholders: Placeholder[] | null
    service: "section" | "component"
    invalidate_key: string
}

const Placeholders = ({ placeholders, service, invalidate_key }: Props) => {
    return (
        <div className='space-y-2'>
            <Title title={"Placeholders"} size='xs' />
            <ListView component={Placeholder} items={placeholders} invalidate_key={invalidate_key} service={service} />
        </div>
    )
}

export default Placeholders