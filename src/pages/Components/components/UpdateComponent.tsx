import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ComponentService } from "@/services/DI/Component"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"

const UpdateComponent = () => {
    const ref = useRef<HTMLTextAreaElement | null>(null)
    const [position, setPosition] = useState<number | null>(null)

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

    useEffect(() => {
        if (!ref || !ref.current) return

        const handleClick = (ev: FocusEvent) => {
            setPosition((ev.target as HTMLTextAreaElement).selectionStart)
        }

        ref.current.addEventListener("blur", handleClick)
        return () => {
            if (!ref || !ref.current) return
            ref.current.removeEventListener("blur", handleClick)
        }
    }, [content])

    const onSubmit = async () => {
        console.log({
            content,
            title,
            component,
            position
        });

        if (!content || !title || !component || !position) return
        setIsLoading(true)
        const response = await ComponentService.update({ ...component, content: content, title: title }, position)
        if (response.status === "error") {
            if ("errors" in response) {
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
    }

    useEffect(() => {
        return () => {
            setTitle(null)
            setContent(null)
        }
    }, [])

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
                            ref={ref}
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