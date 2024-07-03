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
import { Button } from '@/components/ui/button'
import { useTemplateUpdateModal } from '@/store/templateUpdateModal'
import { TemplateService } from '@/services/DI/Template'
import { useLocation, useNavigate } from "react-router-dom"
import { handleResponse } from "@/utils/handleResponse"

const UpdateTemplate = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    
    const isOpen = useTemplateUpdateModal(state => state.isOpen)
    const setClose = useTemplateUpdateModal(state => state.setClose)
    const setTemplate = useTemplateUpdateModal(state => state.setTemplate)
    const template = useTemplateUpdateModal(state => state.template)

    const [title, setTitle] = useState("")

    useEffect(() => {
        if (template) {
            setTitle(template?.title)
        }
    }, [template])

    const onSubmit = async () => {
        if (template && title.length > 4) {
            setLoading(true)
            const response = await TemplateService.update({ ...template, title: title })
            const parsed = handleResponse<Template>(response, location, navigate)
            setLoading(false)
            if (parsed) {
                setTemplate(parsed.data!)
            }
            setClose()
        }
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
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="template name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} disabled={loading}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTemplate