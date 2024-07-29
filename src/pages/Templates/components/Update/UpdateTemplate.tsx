import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTemplateUpdate } from "../../pages/hooks/useTemplate"
import { FetchTemplateToUpdate } from "./FetchTemplateToUpdate"

const UpdateTemplate = ({ isOpen, setClose, template_id }: TUpdateTemplate) => {

    const { isPending, mutate } = useTemplateUpdate({ invalidate_key: template_id })

    const [title, setTitle] = useState("")

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update template</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FetchTemplateToUpdate template_id={template_id} setTitle={(value: Template['title']) => setTitle(value)} />
                </div>
                <DialogFooter>
                    <Button onClick={() => mutate({ title: title, id: template_id })} disabled={isPending}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTemplate