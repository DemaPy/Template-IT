import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { TemplatesToSelect } from './TemplatesToSelect'


type TTemplateSelect = {
    isLoading: boolean
    onSelect: (value: Component['id']) => void
}

const TemplateSelect = ({ isLoading, onSelect }: TTemplateSelect) => {
    const [templateid, setTemplate] = useState<Template["id"]>("")

    return (
        <Select
            value={templateid}
            disabled={isLoading}
            onValueChange={id => {
                if (id === "default") return
                onSelect(id)
                setTemplate("default")
            }}
        >
            <SelectTrigger className="col-span-4">
                <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem defaultValue={"Select template"} value={'default'}>Select template</SelectItem>
                <TemplatesToSelect />
            </SelectContent>
        </Select>

    )
}

export default TemplateSelect