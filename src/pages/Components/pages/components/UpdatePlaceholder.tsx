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
import { handleResponse } from "@/utils/handleResponse"
import { useLocation, useNavigate } from "react-router-dom"
import { SectionService } from "@/services/DI/Section"
import { ComponentService } from "@/services/DI/Component"
import { usePlaceholderUpdateModal } from "@/store/placeholderUpdateModal"

const UpdatePlaceholder = ({ Service }: { Service: typeof SectionService | typeof ComponentService }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const isOpen = usePlaceholderUpdateModal(state => state.isOpen)
    const setClose = usePlaceholderUpdateModal(state => state.setClose)
    const placeholder = usePlaceholderUpdateModal(state => state.placeholder)
    const setPlaceholder = usePlaceholderUpdateModal(state => state.setPlaceholder)

    const [title, setTitle] = useState<string | null>(null)
    const [fallback, setFallback] = useState<string | null>(null)

    useEffect(() => {
        if (placeholder) {
            setTitle(placeholder?.title)
            setFallback(placeholder?.fallback)
        }
    }, [placeholder])

    const onSubmit = async () => {
        if (!fallback || !title || !placeholder) return
        setLoading(true)
        const response = await Service.updatePlaceholder({ id: placeholder.id, fallback: fallback, title: title })
        const parsed = handleResponse<Placeholder>(response, location, navigate)
        setLoading(false)
        if (parsed) {
            setPlaceholder(parsed.data!)
        }
        setLoading(false)
        setClose()
        setTitle(null)
        setFallback(null)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit placeholder</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input
                            id="name"
                            value={title || ""}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="content" className="text-left">
                            Fallback
                        </Label>
                        <Input
                            id="content"
                            value={fallback || ""}
                            onChange={ev => setFallback(ev.target.value)}
                            className="col-span-4"
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

export default UpdatePlaceholder