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
import { useComponentUpdate, useFetchComponent } from "../pages/hooks/useComponent"
import ComponentsSkeleton from "./Skeleton"
import toast from "react-hot-toast"
import Error from "@/pages/Error/Error"
import Editor from "@/components/Editor/Editor"
import { CreatePlaceholdersDTO } from "@/services/types/Placeholder"

const UpdateComponent = ({ component_id, isOpen, setClose }: { setClose: () => void, isOpen: boolean, component_id: Component['id'] }) => {
    const { isPending: isFetching, data, isError, error } = useFetchComponent(component_id)
    const { isPending, mutate } = useComponentUpdate({ invalidate_key: component_id })

    const [title, setTitle] = useState<string>(data!.data.title)
    const [content, setContent] = useState<string>(data!.data.content)
    const [placeholdersToDelete, setPlaceholdersToDelete] = useState<CreatePlaceholdersDTO['placeholders']>([])
    const [placeholdersToCreate, setPlaceholdersToCreate] = useState<CreatePlaceholdersDTO['placeholders']>([])

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        toast.error(error.message);
        return <Error error={error} message={error.message} path="/components" />
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
                    <DialogTitle>Edit component</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={title || data.data.title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <div className="col-span-4 resize-y max-h-[500px] min-h-[300px]">
                            <Label htmlFor="content" className="text-left">
                                Content
                            </Label>
                            <Editor
                                content={content}
                                placeholders={data.data.placeholders}
                                isLoading={isPending}
                                isContentEditable={true}
                                onSubmit={handleEditorSubmit}
                            />
                        </div>
                    </div>
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