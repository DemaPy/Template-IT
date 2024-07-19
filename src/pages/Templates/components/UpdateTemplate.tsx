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
import { useTemplateUpdateModal } from '@/store/templateUpdateModal'
import ComponentsSkeleton from "@/pages/Components/components/Skeleton"
import { useFetchTemplate, useTemplateUpdate } from "../pages/hooks/useTemplate"
import toast from "react-hot-toast"
import Error from "@/pages/Error/Error"

const UpdateTemplate = ({ template_id }: { template_id: Template['id'] }) => {

    const { isPending: isFetching, data, isError, error } = useFetchTemplate(template_id)
    const { isPending, mutate } = useTemplateUpdate({ invalidate_key: template_id })

    const isOpen = useTemplateUpdateModal(state => state.isOpen)
    const setClose = useTemplateUpdateModal(state => state.setClose)

    const [title, setTitle] = useState("")

    if (isFetching) return <ComponentsSkeleton />

    if (isError && !data) {
        toast.error(error.message);
        return <Error message={error.message} path="/templates" />
    }

    if (!data) {
        toast.error("Unexpected error happend.");
        return
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update template</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                </div>
                <DialogFooter>
                    <Button onClick={() => mutate({ title: title, id: data.data.id })} disabled={isPending}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTemplate