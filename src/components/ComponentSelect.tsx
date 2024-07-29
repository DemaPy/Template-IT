import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { ComponentsToSelect } from '@/components/ComponentsToSelect'


type TComponentSelect = {
    isLoading: boolean
    onSelect: (value: Component['id']) => void
}

const ComponentSelect = ({ isLoading, onSelect}: TComponentSelect) => {
    const [component, setComponent] = useState<Component["id"]>("")

    return (
        <Select
            value={component}
            disabled={isLoading}
            onValueChange={id => {
                if (id === "default") return
                onSelect(id)
                setComponent("default")
            }}
        >
            <SelectTrigger className="col-span-4">
                <SelectValue placeholder="Select component" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem defaultValue={"Select component"} value={'default'}>Select component</SelectItem>
                <ComponentsToSelect />
            </SelectContent>
        </Select>

    )
}

export default ComponentSelect