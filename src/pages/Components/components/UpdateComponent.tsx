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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useComponentUpdateModal } from "@/store/componentUpdateModal"
import { useComponentUpdate, useFetchComponent } from "../pages/hooks/useComponent"
import ComponentsSkeleton from "./Skeleton"
import toast from "react-hot-toast"
import Error from "@/pages/Error/Error"
import { decode } from "html-entities"
import Title from "@/components/Title"

const UpdateComponent = ({ component_id }: { component_id: Component['id'] }) => {

    const { isPending: isFetching, data, isError, error } = useFetchComponent(component_id)
    const { isPending, mutate } = useComponentUpdate({ invalidate_key: component_id })

    const isOpen = useComponentUpdateModal(state => state.isOpen)
    const setClose = useComponentUpdateModal(state => state.setClose)

    const [title, setTitle] = useState<string>(data!.data.title)
    const [content, setContent] = useState<string>(decode(data!.data.content))

    if (isFetching) return <ComponentsSkeleton />

    if (isError) {
        toast.error(error.message);
        return <Error error={error} message={error.message} path="/components" />
    }

    if (!data) {
        toast.error("Unexpected error happend.");
        return
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
                        <Label htmlFor="content" className="text-left">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={content || data.data.content}
                            onChange={ev => setContent(ev.target.value)}
                            className="col-span-4 resize-y min-h-96 max-h-96"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={() => {
                        toast((t) => (
                            <section>
                                <Label>Attention!</Label>
                                <Title size="xs" title={"All placeholders will be removed. Proceed?"} />
                                <div className="flex items-center gap-2 mt-2">
                                    <Button className="w-full" onClick={() => {
                                        toast.dismiss(t.id)
                                        setClose()
                                    }} size={"sm"} variant={"default"}>No</Button>
                                    <Button className="w-full" onClick={() => {
                                        mutate({ id: component_id, content: content, title: title })
                                        setClose()
                                        toast.dismiss(t.id)
                                    }} size={"sm"} variant={"ghost"}>Yes</Button>
                                </div>
                            </section>
                        ))
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateComponent