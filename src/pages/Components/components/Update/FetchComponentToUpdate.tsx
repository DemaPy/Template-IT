import Error from "@/pages/Error/Error"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useFetchComponent } from "../../pages/hooks/useComponent"
import Editor from "@/components/Editor/Editor"
import ComponentsSkeleton from "../Skeleton"

export function FetchComponentToUpdate({ component_id, setTitle, title, handleEditorSubmit }: TFetchComponentToUpdate) {
    const { isPending, data, isError, error } = useFetchComponent(component_id)

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <Error error={error} message={error.message} path="/components" />
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
            <div className="col-span-4 resize-y max-h-[500px] min-h-[300px]">
                <Label htmlFor="content" className="text-left">
                    Content
                </Label>
                <Editor
                    content={data.data.content}
                    placeholders={data.data.placeholders}
                    isLoading={isPending}
                    isContentEditable={true}
                    onSubmit={handleEditorSubmit}
                />
            </div>
        </div>
    )
}