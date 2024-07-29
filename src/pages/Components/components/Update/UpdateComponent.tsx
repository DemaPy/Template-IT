import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useComponentUpdate, useFetchComponent } from "../../pages/hooks/useComponent"
import ComponentsSkeleton from "../Skeleton"
import Error from "@/pages/Error/Error"
import { CreatePlaceholders } from "@/services/types/Placeholder"
import { FetchComponentToUpdate } from "./FetchComponentToUpdate"

const UpdateComponent = ({ component_id, isOpen, setClose }: TUpdateComponent) => {
    const { isPending: isFetching, data, isError, error } = useFetchComponent(component_id)
    const { isPending, mutate } = useComponentUpdate({ invalidate_key: component_id })

    const [title, setTitle] = useState<string>(data!.data.title)
    const [content, setContent] = useState<string>(data!.data.content)
    const [placeholdersToDelete, setPlaceholdersToDelete] = useState<CreatePlaceholders['placeholders']>([])
    const [placeholdersToCreate, setPlaceholdersToCreate] = useState<CreatePlaceholders['placeholders']>([])

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        return <Error error={error} message={error.message} path="/components" />
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
                    <DialogTitle>Edit component</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FetchComponentToUpdate
                        component_id={component_id}
                        handleEditorSubmit={handleEditorSubmit}
                        setTitle={(value) => setTitle(value)}
                        title={title}
                    />
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={() => {
                        mutate({ id: component_id, content: content, title: title, placeholdersToCreate, placeholdersToDelete })
                        setClose()
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateComponent