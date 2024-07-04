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
import { useSectionCreateModal } from '@/store/sectionCreateModal'
import { useLocation, useNavigate } from "react-router-dom"
import { handleResponse } from "@/utils/handleResponse"
import { SectionService } from "@/services/DI/Section"

const UpdateSection = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState<boolean>(false)
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
            setLoading(true)
            const response = await SectionService.update({ ...section, content: content, title: title })
            const parsed = handleResponse<Section>(response, location, navigate)
            setLoading(false)
            if (parsed) {
                setSection(parsed.data)
            }
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
                            className="col-span-4 resize-y min-h-48 max-h-80"
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

export default UpdateSection