import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateFromComponent } from '../hooks/useSection'
import toast from 'react-hot-toast'
import { useFetchComponents } from '@/pages/Components/pages/hooks/useComponent'
import Error from '@/pages/Error/Error'
import { useState } from 'react'


type Props = {
    template_id: Template['id']
    isRender?: boolean
}

const ComponentSelect = ({ isRender = true, template_id }: Props) => {
    const { isError, isPending, error, mutate } = useCreateFromComponent({ invalidate_key: template_id })
    const { data, isPending: isFetching } = useFetchComponents()

    const [component, setComponent] = useState<Component["id"]>("")

    if (isError) {
        toast.error(error.message);
        return <Error error={error} message={error.message} path="/" />
    }

    if (!data) {
        toast.error("Unexpected error happend.");
        return <Error error={error} message={`Unexpected error happend for Components.tsx`} path="/" />
    }

    return (
        <>
            {
                isRender && (
                    <Select
                        value={component}
                        disabled={isFetching || isPending}
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
                            {data.data.map((item, idx) => <SelectItem key={idx} value={item.id}>{item.title}</SelectItem>)}
                        </SelectContent>
                    </Select>

                )
            }
        </>
    )
}

export default ComponentSelect