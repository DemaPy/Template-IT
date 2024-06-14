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
import { useSectionUpdateModal } from '@/store/sectionUpdateModal'
import { TemplateService } from '@/services/DI/Template'
import { useSectionCreateModal } from '@/store/sectionCreateModal'

const UpdateSection = () => {
    const ref = useRef<HTMLTextAreaElement | null>(null)
    const [position, setPosition] = useState<number | null>(null)

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
        if (section && title && content && position) {
            const response = await TemplateService.updateSection({ ...section, content: content, title: title }, position)
            if (response.status === "error") {
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
                            ref={ref}
                            id="content"
                            value={content}
                            onChange={ev => setContent(ev.target.value)}
                            className="col-span-4 resize-y min-h-48 max-h-80"
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