import ListView from '@/components/List'
import Title from '@/components/Title'
import Placeholder from './Placeholder'

type Props = {
    placeholders: Placeholder[] | null
    handleDeletePlaceholder: (id: string) => void
}

const Placeholders = ({ handleDeletePlaceholder, placeholders }: Props) => {
    return (
        <div>
            <Title title={"Placeholders"} size='xs' />
            <ListView component={Placeholder} handleDeletePlaceholder={handleDeletePlaceholder} items={placeholders} />
        </div>
    )
}

export default Placeholders