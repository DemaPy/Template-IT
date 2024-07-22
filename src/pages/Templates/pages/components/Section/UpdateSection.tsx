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
import { useSectionUpdateModal } from '@/store/sectionUpdateModal'
import { useUpdateSection } from "../../hooks/useSection"
import toast from "react-hot-toast"
import Title from "@/components/Title"
import { decode } from "html-entities"

const UpdateSection = ({ section, template_id }: { section: Section, template_id: Template['id'] }) => {
    const isOpen = useSectionUpdateModal(state => state.isOpen)
    const setClose = useSectionUpdateModal(state => state.setClose)

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
                            className="col-span-4 resize-y min-h-48 max-h-80"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => {
                        toast((t) => (
                            <section>
                                <Label>Attention!</Label>
                                <Title size="xs" title={"All placeholders will be removed. Proceed?"} />
                                <div className="flex items-center gap-2 mt-2">
                                    <Button className="w-full" onClick={() => {
                                        toast.dismiss(t.id)
                                        setClose()
                                    }} size={"sm"} variant={"default"}>No</Button>
                                    <Button className="w-full" onClick={() => {
                                        mutate({ id: section.id, content: content, title: title, templateId: section.templateId })
                                        toast.dismiss(t.id)
                                        setClose()
                                    }} size={"sm"} variant={"ghost"}>Yes</Button>
                                </div>
                            </section>
                        ))
                    }} disabled={isPending}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateSection