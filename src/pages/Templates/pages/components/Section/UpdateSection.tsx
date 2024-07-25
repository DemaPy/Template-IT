import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFetchSection, useUpdateSection } from "../../hooks/useSection"
import ComponentsSkeleton from "@/pages/Components/components/Skeleton"
import toast from "react-hot-toast"
import Error from "@/pages/Error/Error"
import Editor from "@/components/Editor/Editor"
import { CreatePlaceholdersDTO } from "@/services/types/Placeholder"

const UpdateSection = ({ section, template_id, isOpen, setClose }: { setClose: () => void, isOpen: boolean, section: Section, template_id: Template['id'] }) => {
    const { isPending: isFetching, data, isError, error } = useFetchSection(section.id)
    const { isPending, mutate } = useUpdateSection({ invalidate_key: template_id })

    const [title, setTitle] = useState(section.title)
    const [content, setContent] = useState(section.content)
    const [placeholdersToDelete, setPlaceholdersToDelete] = useState<CreatePlaceholdersDTO['placeholders']>([])
    const [placeholdersToCreate, setPlaceholdersToCreate] = useState<CreatePlaceholdersDTO['placeholders']>([])

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        toast.error(error.message);
        return <Error error={error} message={error.message} path={`/templates/${section.templateId}`} />
    }

    if (!data) {
        toast.error("Unexpected error happend.");
        return
    }

    const handleEditorSubmit = (data: EditorOnSubmitProps) => {
        setContent(data.content)
        setPlaceholdersToCreate(data.placeholdersToCreate)
        setPlaceholdersToDelete(data.placeholdersToDelete)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit section</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <div className="col-span-4 resize-y max-h-[500px] min-h-[300px]">
                            <Label htmlFor="content" className="text-left">
                                Content
                            </Label>
                            <Editor
                                content={content}
                                placeholders={section.placeholders}
                                isLoading={isPending}
                                isContentEditable={true}
                                onSubmit={handleEditorSubmit}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        mutate({ id: section.id, content: content, title: title, templateId: section.templateId, placeholdersToCreate, placeholdersToDelete })
                        setClose()
                    }} disabled={isPending}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateSection