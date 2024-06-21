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
import { handleResponse } from "@/utils/handleResponse"
import { useLocation, useNavigate } from "react-router-dom"


const CreateComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const isOpen = useComponentCreateModal(state => state.isOpen)
    const setClose = useComponentCreateModal(state => state.setClose)
    const setComponent = useComponentUpdateModal(state => state.setComponent)

    const [componentName, setComponentName] = useState("")
    const [content, setContent] = useState("")

    const onSubmit = async () => {
        if (componentName.length >= 3) {
            setLoading(true)
            const response = await ComponentService.create({ title: componentName, content })
            const parsed = handleResponse<Component>(response, location, navigate)
            setLoading(false)
            if (parsed) {
                setComponent(parsed.data!)
            }
            setClose()
        } else {
            alert("Minimum length 3 symbols")
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

export default CreateComponent