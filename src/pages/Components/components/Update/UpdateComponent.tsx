import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { useComponentUpdate } from "../../pages/hooks/useComponent"
import ComponentsSkeleton from "../ComponentsSkeleton"
import {ErrorPage} from "@/pages/Error/Error"
import { CreatePlaceholders } from "@/services/types/Placeholder"
import { FetchComponentToUpdate } from "./FetchComponentToUpdate"

const UpdateComponent = ({ component_id, isOpen, setClose }: TUpdateComponent) => {
    const { isPending, mutate, isError, error } = useComponentUpdate({ invalidate_key: component_id })

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [placeholdersToDelete, setPlaceholdersToDelete] = useState<CreatePlaceholders['placeholders']>([])
    const [placeholdersToCreate, setPlaceholdersToCreate] = useState<CreatePlaceholders['placeholders']>([])

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <ErrorPage error={error} message={error.message} path="/components" />
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
        mutate({ id: component_id, content: new_content, title: new_title, placeholdersToCreate, placeholdersToDelete })
        setClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit component</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FetchComponentToUpdate
                        component_id={component_id}
                        handleEditorSubmit={handleEditorSubmit}
                        setTitle={(value) => setTitle(value)}
                        title={title}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateComponent