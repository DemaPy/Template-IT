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


const CreateTemplate = () => {
    const isOpen = useTemplateCreateModal(state => state.isOpen)
    const setClose = useTemplateCreateModal(state => state.setClose)
    const [templateName, setTemplateName] = useState("")
    const setTemplate = useTemplateUpdateModal(state => state.setTemplate)
    const [wrapper, setTemplateWrapper] = useState("")

    const onSubmit = async () => {
        if (templateName.length >= 3) {
            const response = await TemplateService.create({ title: templateName })
            if (response.error instanceof Error) {
                alert(response.message)
                setClose()
                return
            }
            setTemplate(response.data!)
            setClose()
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
                    <Button onClick={onSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateTemplate