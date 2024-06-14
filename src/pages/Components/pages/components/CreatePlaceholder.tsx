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
import { useEffect, useState } from 'react'
import { usePlaceholderCreateModal } from "@/store/placeholderCreateModal"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"
import { ComponentService } from "@/services/DI/Component"

const CreatePlaceholder = () => {
    const isOpen = usePlaceholderCreateModal(state => state.isOpen)
    const setClose = usePlaceholderCreateModal(state => state.setClose)
    const placeholder = usePlaceholderCreateModal(state => state.placeholder)

    const component = useComponentUpdateModal(state => state.component)
    const setComponentStore = useComponentUpdateModal(state => state.setComponent)


    const [_placeholder, setPlaceholder] = useState<number | null>(null)
    const [title, setPlaceholderTitle] = useState<string>('')
    const [fallback, setFallback] = useState<string>('')

    const onSubmit = async () => {
        if (_placeholder && component && title.length >= 3 && fallback.length >= 3) {
            const response = await ComponentService.createComponentPlaceholder({ title, position: _placeholder, componentId: component.id, fallback })
            if (response.status === "error") {
                alert(response.message)
                setClose()
                return
            }
            if (response.status === "success" || response.data) {
                setComponentStore({
                    ...component,
                    placeholders: [...component.placeholders, response.data]
                })
            }
            setClose()
        } else {
            alert("Minimum length 3 symbols")
        }
    }

    useEffect(() => {
        if (placeholder) {
            setPlaceholder(placeholder)
        }

        () => {
            setPlaceholder(null)
        }
    }, [placeholder])

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set placeholder</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="placeholder title"
                            value={title}
                            onChange={ev => setPlaceholderTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="fallback" className="text-left">
                            Fallback value
                        </Label>
                        <Input
                            id="fallback"
                            placeholder="fallback"
                            value={fallback}
                            onChange={ev => setFallback(ev.target.value)}
                            className="col-span-4"
                        />
                        <Label htmlFor="placeholder" className="text-left">
                            Placeholder
                        </Label>
                        <Input
                            disabled={true}
                            id="placeholder"
                            placeholder="placeholder position"
                            defaultValue={_placeholder || ""}
                            className="col-span-4"
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

export default CreatePlaceholder