import Error from "@/pages/Error/Error"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useFetchSection } from "../../../hooks/useSection"
import Editor from "@/components/Editor/Editor"
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton"
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function FetchSectionToUpdate({ section_id, setTitle, handleEditorSubmit, title, handleSubmit }: TFetchSectionToUpdate) {
    const { isPending, data, isError, error } = useFetchSection(section_id)

    if (isPending) return <ComponentsSkeleton />

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
                placeholder="section title"
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
            <DialogFooter className="col-span-4">
                <Button onClick={() => handleSubmit({
                    old_title: data.data.title,
                    old_content: data.data.content
                })} disabled={isPending}>
                    Save changes
                </Button>
            </DialogFooter>
        </div>
    )
}