import { TemplateServiceLocal } from '@/services/TemplateLocal'
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
import { useSectionUpdateModal } from '@/store/sectionUpdateModal'
import { TemplateService } from '@/services/DI/Template'
import { useSectionCreateModal } from '@/store/sectionCreateModal'

const UpdateSection = () => {
    const setSection = useSectionCreateModal(state => state.setSection)
    const isOpen = useSectionUpdateModal(state => state.isOpen)
    const setClose = useSectionUpdateModal(state => state.setClose)
    const section = useSectionUpdateModal(state => state.section)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        if (section) {
            setTitle(section?.title)
            setContent(section?.content)
        }
    }, [section])

    const onSubmit = async () => {
        if (section && title && content) {
            const response = await TemplateService.updateSection({ ...section, content: content, title: title })
            if (response.error instanceof Error) {
                alert(response.message)
                setClose()
                return
            }
            setSection(response.data!)
            setClose()
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit section</DialogTitle>
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
                        <Label htmlFor="content" className="text-left">
                            Content
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={ev => setContent(ev.target.value)}
                            className="col-span-4 resize-y max-h-44"
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

export default UpdateSection