import { Button } from "@/components/ui/button"
import { useDeletePlaceholder } from "@/pages/Components/pages/hooks/usePlaceholder"
import { TrashIcon } from "lucide-react"
import { useDeleteSectionPlaceholder } from "../../hooks/useSection"

type Props = {
    item: Placeholder
    service: "section" | "component"
    invalidate_key: string
}

const Placeholder = ({ item, service, invalidate_key }: Props) => {
    const { mutate: mutateComponentPlaceholder, isPending: isComponentPlaceholderPending } = useDeletePlaceholder({ invalidate_key })
    const { mutate: mutateSectionPlaceholder, isPending: isSectionPlaceholderPending } = useDeleteSectionPlaceholder({ invalidate_key })

    const mutate = service === "component" ? mutateComponentPlaceholder : mutateSectionPlaceholder
    const isPending = service === "component" ? isComponentPlaceholderPending : isSectionPlaceholderPending

    return (
        <div className='flex justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm font-semibold" >{item.title}</p>
            <Button disabled={isPending} variant={"ghost"} onClick={() => mutate(item.id)} size={"icon"}> <TrashIcon className='w-4 h-4' /> </Button>
        </div>
    )
}

export default Placeholder