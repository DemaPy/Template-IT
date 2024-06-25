import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


type Props = {
    component_id: Component['id']
    setComponent: (id: Component['id']) => void
    components: Component[]
    isRender?: boolean
}

const ComponentSelect = ({ isRender = true, components, component_id, setComponent }: Props) => {
    return (
        <>
            {
                isRender && (
                    <Select
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