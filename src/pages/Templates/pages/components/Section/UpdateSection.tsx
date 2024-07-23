import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useUpdateSection } from "../../hooks/useSection"
import { decode } from "html-entities"

const UpdateSection = ({ section, template_id, isOpen, setClose }: { setClose: () => void, isOpen: boolean, section: Section, template_id: Template['id'] }) => {
    const { isPending, mutate } = useUpdateSection({ invalidate_key: template_id })

    const [title, setTitle] = useState(section.title)
    const [content, setContent] = useState(decode(section.content))

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
                            className="col-span-4 resize-y max-h-[500px] min-h-[300px]"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        mutate({ id: section.id, content: content, title: title, templateId: section.templateId })
                        setClose()
                    }} disabled={isPending}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateSection