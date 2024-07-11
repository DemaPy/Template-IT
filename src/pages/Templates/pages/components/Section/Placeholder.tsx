import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"

type Props = {
    item: Placeholder
    handleDeletePlaceholder: (id: string) => void
}

const Placeholder = ({ handleDeletePlaceholder, item }: Props) => {
    return (
        <div className='flex justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm font-semibold" >{item.title}</p>
            <Button variant={"ghost"} onClick={() => handleDeletePlaceholder(item.id)} size={"icon"}> <TrashIcon className='w-4 h-4' /> </Button>
        </div>
    )
}

export default Placeholder