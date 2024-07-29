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
import { useState } from 'react'
import { useCreateTemplate } from '../pages/hooks/useTemplate'


const CreateTemplate = ({ isOpen, setClose }: TCreateTemplate) => {
    const [title, setTitle] = useState("")
    const { isPending, mutate } = useCreateTemplate()

    const handleCreate = () => {
        mutate({
            title: title
        })
        setClose()
    }
    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create template</DialogTitle>
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
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={handleCreate}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTemplate