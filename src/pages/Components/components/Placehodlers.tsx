import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    placeholders: Placeholder[]
    setPlaceholders: (placeholders: Placeholder[]) => void
}
const Placehodlers = ({ placeholders, setPlaceholders }: Props) => {
    const updatePlacehodler = ({ id, fallback }: Placeholder) => {
        setPlaceholders(placeholders.map((item: Placeholder) => {
            if (item.id === id) {
                return {
                    ...item,
                    fallback: fallback
                }
            }
            return item
        }))
    }

    return (
        <div>
            {
                placeholders.map((item) => <Placeholder onUpdate={updatePlacehodler} placeholder={item} key={item.id} />)
            }
        </div>
    )
}

function Placeholder({ placeholder, onUpdate }: { onUpdate: (value: Placeholder) => void, placeholder: Placeholder }) {
    const { title, id, fallback } = placeholder

    return (
        <div className="flex items-stretch justify-between gap-2">
            <div className="grow">
                <Label>Title</Label>
                <Input disabled onChange={(ev) => onUpdate({ fallback: fallback, title: ev.target.value, id })} value={title} placeholder="title" />
            </div>
            <div className="grow">
                <Label>Fallback</Label>
                <Input onChange={(ev) => onUpdate({ fallback: ev.target.value, title, id })} value={placeholder.fallback} placeholder="add fallback value" />
            </div>
        </div>
    )
}

export default Placehodlers