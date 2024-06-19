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
import { handleResponse } from "@/utils/handleResponse"
import { useLocation, useNavigate } from "react-router-dom"

const UpdateComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

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
        setLoading(true)
        const response = await ComponentService.update({ ...component, content: content, title: title })
        const parsed = handleResponse<Component>(response, location, navigate)
        setLoading(false)
        if (parsed) {
            setComponent(parsed.data!)
        }
        setLoading(false)
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
                    <Button disabled={loading} onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateComponent