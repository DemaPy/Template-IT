import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ComponentService } from '@/services/DI/Component'
import { handleResponse } from '@/utils/handleResponse'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCreateFromComponent } from '../hooks/useSection'
import toast from 'react-hot-toast'


type Props = {
    template_id: Template['id']
    isRender?: boolean
}

const ComponentSelect = ({ isRender = true, template_id }: Props) => {
    const { isError, isPending, error, mutate } = useCreateFromComponent({ invalidate_key: template_id })

    const location = useLocation()
    const navigate = useNavigate()

    const [components, setComponents] = useState<Component[]>([])
    const [component, setComponent] = useState<Component["id"]>("")
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

    if (isError) {
        toast.error(error.message)
    }

    return (
        <>
            {
                isRender && (
                    <Select
                        value={component}
                        disabled={loading || isPending}
                        onValueChange={id => {
                            if (id === "default") return
                            mutate({
                                componentId: id,
                                templateId: template_id
                            })
                            setComponent("default")
                        }}
                    >
                        <SelectTrigger className="col-span-4">
                            <SelectValue placeholder="Select component" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem defaultValue={"Select component"} value={'default'}>Select component</SelectItem>
                            {components.map((item, idx) => <SelectItem key={idx} value={item.id}>{item.title}</SelectItem>)}
                        </SelectContent>
                    </Select>

                )
            }
        </>
    )
}

export default ComponentSelect