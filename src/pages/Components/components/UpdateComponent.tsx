import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ComponentService } from "@/services/DI/Component"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"

const UpdateComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const isOpen = useComponentUpdateModal(state => state.isOpen)
    const setClose = useComponentUpdateModal(state => state.setClose)
    const component = useComponentUpdateModal(state => state.component)
    const setComponent = useComponentUpdateModal(state => state.setComponent)

    const [title, setTitle] = useState<string | null>(null)
    const [content, setContent] = useState<string | null>(null)

    useEffect(() => {
        if (component) {
            setTitle(component?.title)
            setContent(component?.content)
        }
    }, [component])

    const onSubmit = async () => {
        if (!content || !title || !component) return
        setIsLoading(true)

        const response = await ComponentService.update({ ...component, content: content, title: title })
        if (response.status === "error") {
            if ("errors" in response) {
                setIsLoading(false)
                let error_message = ""
                for (const error of response.errors) {
                    error_message += response.message + ": " + error.msg
                }
                alert(error_message)
                return
            }

            alert(response.message)
            return
        }
        setComponent(response.data)
        setIsLoading(false)
        setClose()
        setTitle(null)
        setContent(null)
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
                            value={title || ""}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="content" className="text-left">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={content || ""}
                            onChange={ev => setContent(ev.target.value)}
                            className="col-span-4 resize-y min-h-48 max-h-80"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} disabled={isLoading}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateComponent