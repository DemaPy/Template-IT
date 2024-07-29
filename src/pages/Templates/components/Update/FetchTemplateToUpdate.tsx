import Error from "@/pages/Error/Error"
import { useFetchTemplate } from "../../pages/hooks/useTemplate"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ComponentsSkeleton from "@/pages/Components/components/Skeleton"

export function FetchTemplateToUpdate({ template_id, setTitle, title }: TFetchTemplateToUpdate) {
    const { isPending: isFetching, data, isError, error } = useFetchTemplate(template_id)

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        return <Error error={error} message={error.message} path="/templates" />
    }

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
                Title
            </Label>
            <Input
                id="name"
                placeholder="template title"
                value={title || data.data.title}
                onChange={ev => setTitle(ev.target.value)}
                className="col-span-4"
            />
        </div>
    )
}