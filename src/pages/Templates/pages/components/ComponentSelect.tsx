import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ComponentService } from '@/services/DI/Component'
import { handleResponse } from '@/utils/handleResponse'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


type Props = {
    component_id: Component['id']
    setComponent: (id: Component['id']) => void
    isRender?: boolean
}

const ComponentSelect = ({ isRender = true, component_id, setComponent }: Props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const [components, setComponents] = useState<Component[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await ComponentService.getAll()
            const parsed = handleResponse<Component[]>(response, location, navigate)
            if (parsed) {
                setComponents(parsed.data)
            }
            setLoading(false)
        })()
    }, [])
    return (
        <>
            {
                isRender && (
                    <Select
                        disabled={loading}
                        value={component_id}
                        onValueChange={value => setComponent(value)}
                    >
                        <SelectTrigger className="col-span-4">
                            <SelectValue placeholder="Select component" />
                        </SelectTrigger>
                        <SelectContent>
                            {components.map((item, idx) => <SelectItem key={idx} value={item.id}>{item.title}</SelectItem>)}
                        </SelectContent>
                    </Select>

                )
            }
        </>
    )
}

export default ComponentSelect