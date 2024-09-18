import {ErrorPage} from "@/pages/Error/Error"
import { useFetchTemplate } from "../../pages/hooks/useTemplate"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton"

export function FetchTemplateToUpdate({ template_id, setTitle }: TFetchTemplateToUpdate) {
    const { isPending: isFetching, data, isError, error } = useFetchTemplate(template_id)

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        return <ErrorPage error={error} message={error.message} path="/templates" />
    }

    return (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
                Title
            </Label>
            <Input
                id="name"
                placeholder="template title"
                defaultValue={data.data.title}
                onChange={ev => setTitle(ev.target.value)}
                className="col-span-4"
            />
        </div>
    )
}