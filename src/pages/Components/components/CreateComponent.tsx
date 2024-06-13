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
import { Textarea } from '@/components/ui/textarea'
import { useComponentCreateModal } from '@/store/componentCreateModal'
import { ComponentService } from "@/services/DI/Component"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"


const CreateComponent = () => {
    const isOpen = useComponentCreateModal(state => state.isOpen)
    const setClose = useComponentCreateModal(state => state.setClose)
    const setComponent = useComponentUpdateModal(state => state.setComponent)

    const [componentName, setComponentName] = useState("")
    const [content, setContent] = useState("")

    const onSubmit = async () => {
        if (componentName.length > 3) {
            const response = await ComponentService.create({ title: componentName, content })
            if (response.status === "error") {
                alert(response.message)
                setClose()
                return
            }
            setComponent(response.data!)
            setClose()
        }
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
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={componentName}
                            onChange={ev => setComponentName(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="content" className="text-left">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={ev => setContent(ev.target.value)}
                            className="col-span-4"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateComponent