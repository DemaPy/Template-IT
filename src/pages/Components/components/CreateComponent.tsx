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
import { ComponentService } from "@/services/DI/Component"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"
import { handleResponse } from "@/utils/handleResponse"
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"


const CreateComponent = () => {
    const isOpen = useComponentCreateModal(state => state.isOpen)

    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const setClose = useComponentCreateModal(state => state.setClose)
    const setComponent = useComponentUpdateModal(state => state.setComponent)

    const [componentTitle, setComponentTitle] = useState("")
    const [content, setContent] = useState<string>("")


    const onSubmit = async () => {
        if (componentTitle.length >= 3 && content.length > 10) {
            const component: ComponentCreateDTO = { title: componentTitle, content}
            setLoading(true)
            const response = await ComponentService.create(component)
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
                            className="col-span-4 resize-y min-h-96 max-h-96 text-xs"
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