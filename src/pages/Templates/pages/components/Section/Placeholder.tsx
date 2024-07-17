import { Button } from "@/components/ui/button"
import { useDeletePlaceholder } from "@/pages/Components/pages/hooks/usePlaceholder"
import { TrashIcon } from "lucide-react"

type Props = {
    item: Placeholder
}

const Placeholder = ({ item }: Props) => {
    const { mutate, isPending } = useDeletePlaceholder({ invalidate_key: item.componentId! })

    return (
        <div className='flex justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm font-semibold" >{item.title}</p>
            <Button disabled={isPending} variant={"ghost"} onClick={() => mutate(item.id)} size={"icon"}> <TrashIcon className='w-4 h-4' /> </Button>
        </div>
    )
}

export default Placeholder