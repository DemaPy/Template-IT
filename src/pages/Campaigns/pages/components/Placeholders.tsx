import ListView from '@/components/List'
import Title from '@/components/Title'
import Placeholder from './Placeholder'

type Props = {
    placeholders: Placeholder[] | null
}

const Placeholders = ({ placeholders }: Props) => {
    return (
        <div>
            <Title title={"Placeholders"} size='xs' />
            <div className='max-h-80 overflow-y-auto'>
                <ListView component={Placeholder} items={placeholders} />
            </div>
        </div>
    )
}

export default Placeholders