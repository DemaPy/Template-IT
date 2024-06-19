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
            <ListView component={Placeholder} items={placeholders} />
        </div>
    )
}

export default Placeholders