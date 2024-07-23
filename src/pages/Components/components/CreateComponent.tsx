import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useComponentCreateModal } from '@/store/componentCreateModal'
import { useState } from "react"
import { useCreateComponent } from "../pages/hooks/useComponent"


const CreateComponent = () => {
    const isOpen = useComponentCreateModal(state => state.isOpen)

    const setClose = useComponentCreateModal(state => state.setClose)

    const [componentTitle, setComponentTitle] = useState("")
    const [content, setContent] = useState<string>("")

    const { isPending, mutate } = useCreateComponent()

    const handleCreate = () => {
        mutate({
            content: content,
            title: componentTitle
        })
        setClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create component</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input
                            id="name"
                            value={componentTitle}
                            onChange={ev => setComponentTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="content" className="text-left">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            onChange={(ev) => setContent(ev.target.value)}
                            value={content}
                            className="col-span-4 resize-y max-h-[500px] min-h-[300px] text-xs"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={handleCreate}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateComponent