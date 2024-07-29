import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { useUpdateSection } from "../../../hooks/useSection"
import Error from "@/pages/Error/Error"
import { CreatePlaceholders } from "@/services/types/Placeholder"
import { FetchSectionToUpdate } from "./FetchSectionToUpdate"
import ComponentsSkeleton from "@/pages/Components/components/ComponentsSkeleton"

const UpdateSection = ({ section_id, template_id, isOpen, setClose }: TUpdateSection) => {
    const { isPending, mutate, isError, error } = useUpdateSection({ invalidate_key: template_id })

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [placeholdersToDelete, setPlaceholdersToDelete] = useState<CreatePlaceholders['placeholders']>([])
    const [placeholdersToCreate, setPlaceholdersToCreate] = useState<CreatePlaceholders['placeholders']>([])

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <Error error={error} message={error.message} path={`/templates/${template_id}`} />
    }

    const handleEditorSubmit = (data: EditorOnSubmitProps) => {
        setContent(data.content)
        setPlaceholdersToCreate(data.placeholdersToCreate)
        setPlaceholdersToDelete(data.placeholdersToDelete)
    }

    const handleSubmit = ({ old_content, old_title }: {
        old_title: Section["title"];
        old_content: Section["content"];
    }) => {
        const new_title = title.length !== 0 ? title : old_title
        const new_content = old_content.length !== content.length ? content : old_content
        mutate({ id: section_id, content: new_content, title: new_title, templateId: template_id, placeholdersToCreate, placeholdersToDelete })
        setClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit section</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FetchSectionToUpdate
                        handleEditorSubmit={handleEditorSubmit}
                        section_id={section_id}
                        setTitle={(value) => setTitle(value)}
                        title={title}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateSection