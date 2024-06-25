import { useTemplateCreateModal } from '@/store/templateCreateModal'
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
import { TemplateService } from '@/services/DI/Template'
import { useTemplateUpdateModal } from '@/store/templateUpdateModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleResponse } from '@/utils/handleResponse'


const CreateTemplate = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const isOpen = useTemplateCreateModal(state => state.isOpen)
    const setClose = useTemplateCreateModal(state => state.setClose)
    const [templateName, setTemplateName] = useState("")
    const setTemplate = useTemplateUpdateModal(state => state.setTemplate)

    const onSubmit = async () => {
        if (templateName.length >= 3) {
            setLoading(true)
            const response = await TemplateService.create({ title: templateName })
            const parsed = handleResponse<Template>(response, location, navigate)
            setLoading(false)
            if (parsed) {
                setTemplate(parsed.data!)
            }
            setClose()
        } else {
            alert("Minimum length: 3 symbols.")
        }
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
                            value={templateName}
                            onChange={ev => setTemplateName(ev.target.value)}
                            className="col-span-4"
                        />
                        {/* <Label htmlFor="wrapper" className="text-left">
                            Wrapper
                        </Label>
                        <Textarea
                            id="wrapper"
                            value={wrapper}
                            onChange={ev => setTemplateWrapper(ev.target.value)}
                            className="col-span-4"
                        /> */}
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTemplate