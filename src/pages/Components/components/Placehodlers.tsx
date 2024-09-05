import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Props = {
    placehodlers: Placeholder[]
}
const Placehodlers = ({ placehodlers }: Props) => {
    const [_placeholders, setPlaceholders] = useState(placehodlers)

    const updatePlacehodler = ({ id, fallback }: Placeholder) => {

        setPlaceholders(
            _placeholders.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        fallback: fallback
                    }
                }
                return item
            })
        )
    }

    return (
        <div>
            {
                _placeholders.map((item) => <Placeholder onUpdate={updatePlacehodler} placeholder={item} key={item.id} />)
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
                <Input onChange={(ev) => onUpdate({ fallback: fallback, title: ev.target.value, id, type: "text" })} value={title} placeholder="title" />
            </div>
            <div className="grow">
                <Label>Fallback</Label>
                <Input onChange={(ev) => onUpdate({ fallback: ev.target.value, title, id, type: "text" })} value={placeholder.fallback} placeholder="add fallback value" />
            </div>
        </div>
    )
}

export default Placehodlers