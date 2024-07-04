import { PlusCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { useSectionCreateModal } from '@/store/sectionCreateModal'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleResponse } from '@/utils/handleResponse'
import { SectionService } from '@/services/DI/Section'

type Props = {
    template_id: string
}

const CreateSection = ({ template_id }: Props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const isOpen = useSectionCreateModal(state => state.isOpen)
    const setClose = useSectionCreateModal(state => state.setClose)
    const setIsOpen = useSectionCreateModal(state => state.setOpen)
    const setSection = useSectionCreateModal(state => state.setSection)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onSubmit = async () => {
        if (title.length > 3 && content.length > 10) {
            setLoading(true)
            const response = await SectionService.create({ templateId: template_id, content, title: title })
            const parsed = handleResponse<Section>(response, location, navigate)
            if (parsed) {
                setSection(parsed.data!)
            }
            setLoading(false)
            setClose()
        }
    }

    return (
        <>
            <Button variant={"ghost"} className='bg-slate-50 rounded-sm sticky top-0 flex justify-between w-full' onClick={setIsOpen}>Create section <PlusCircle className="w-4 h-4" /></Button>
            <Dialog open={isOpen} onOpenChange={setClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create section</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input
                                placeholder='section title'
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
                                className="col-span-4 resize-none w-full min-h-60"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={loading} onClick={onSubmit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default CreateSection