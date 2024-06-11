import ListView from '@/components/List'
import Title from '@/components/Title'
import Placeholder from './Placeholder'

type Props = {
    handleClick: (item: Placeholder) => void
    placeholders: Placeholder[] | null
}

const Placeholders = ({ handleClick, placeholders }: Props) => {
    return (
        <div>
            <Title title={"Placeholders"} size='xs' />
            <ListView handleClick={handleClick} component={Placeholder} items={placeholders} />
        </div>
    )
}

export default Placeholders