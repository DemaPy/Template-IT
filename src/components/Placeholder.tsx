import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { useDeleteSectionPlaceholder } from "../pages/Templates/pages/hooks/useSection"
import UpdatePlaceholder from "@/components/UpdatePlaceholder/UpdatePlaceholder"
import { useDeleteComponentPlaceholder } from "@/pages/Components/pages/hooks/useComponent"
import Error from "@/pages/Error/Error"

type Props = {
    item: Placeholder
    service: "section" | "component"
    invalidate_key: string
}

const Placeholder = ({ item, service, invalidate_key }: Props) => {

    return (
        <div className='flex justify-between gap-2 items-center' key={item.id}>
            <p className="p-2 border rounded-md grow text-sm font-semibold" >{item.title}</p>
            <UpdatePlaceholder fallback={item.fallback} title={item.title} invalidate_key={invalidate_key} service={service} placeholder_id={item.id} />
            <DeletePlaceholder placeholder_id={item.id} service={service} invalidate_key={invalidate_key} />
        </div>
    )
}

type TDeletePlaceholder = { placeholder_id: string, service: "section" | "component", invalidate_key: string }

function DeletePlaceholder({ placeholder_id, service, invalidate_key }: TDeletePlaceholder) {

    const { mutate: mutateComponentPlaceholder, isPending: isComponentPlaceholderPending, isError: isComponentPlaceholderError, error: deleteComponentPlaceholderError } = useDeleteComponentPlaceholder({ invalidate_key })
    const { mutate: mutateSectionPlaceholder, isPending: isSectionPlaceholderPending, isError: isSectionPlaceholderError, error: deleteSectionPlaceholderError } = useDeleteSectionPlaceholder({ invalidate_key })

    const mutate = service === "component" ? mutateComponentPlaceholder : mutateSectionPlaceholder
    const isPending = service === "component" ? isComponentPlaceholderPending : isSectionPlaceholderPending

    if (isComponentPlaceholderError) {
        return <Error error={deleteComponentPlaceholderError} message={deleteComponentPlaceholderError.message} path={`/components/`} />
    }

    if (isSectionPlaceholderError) {
        return <Error error={deleteSectionPlaceholderError} message={deleteSectionPlaceholderError.message} path={`/templates/`} />
    }

    return (
        <Button disabled={isPending} variant={"ghost"} onClick={() => mutate(placeholder_id)} size={"icon"}>
            <TrashIcon className='w-4 h-4' />
        </Button>
    )
}

export default Placeholder