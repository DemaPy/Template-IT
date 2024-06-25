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
import { Textarea } from '@/components/ui/textarea'
import { useComponentCreateModal } from '@/store/componentCreateModal'
import { ComponentService } from "@/services/DI/Component"
import { useComponentUpdateModal } from "@/store/componentUpdateModal"
import { handleResponse } from "@/utils/handleResponse"
import { useLocation, useNavigate } from "react-router-dom"
import { usePosition } from "@/hooks/usePosition"
import ComponentSelect from "@/pages/Templates/pages/components/ComponentSelect"


const CreateComponent = ({ components }: { components: Component[] }) => {
    const isOpen = useComponentCreateModal(state => state.isOpen)
    const [component_id, _setComponent] = useState<string | null>(null)
    const { ref, position, setPosition } = usePosition(isOpen)
    
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const setClose = useComponentCreateModal(state => state.setClose)
    const setComponent = useComponentUpdateModal(state => state.setComponent)

    const [componentTitle, setComponentTitle] = useState("")
    const [content, setContent] = useState("")
    const [placeholders, setPlaceholders] = useState<Pick<Placeholder, "title" | 'position' | 'fallback'>[]>([])


    const onSubmit = async () => {
        if (componentTitle.length >= 3) {
            const component: ComponentCreateDTO = { title: componentTitle, content, placeholders }
            setLoading(true)
            const response = await ComponentService.create(component)
            const parsed = handleResponse<Component>(response, location, navigate)
            setLoading(false)
            if (parsed) {
                setComponent(parsed.data!)
            }
            setClose()
        } else {
            alert("Minimum length 3 symbols")
        }
    }

    const handleSelectComponent = (id: Component['id']) =>{
        if (!position) return
        _setComponent(id)
        const selectedComponent = components.find(item=>item.id===id)!
        const newContent = content.split("")
        newContent.splice(position, 0, selectedComponent.content)
        setPlaceholders(prev => ([...prev, ...selectedComponent.placeholders.map(item => ({ title: item.title, fallback: item.fallback, position: item.position + position}))]))
        setContent(newContent.join(''))
        setPosition(null)
        _setComponent(null)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create component</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={componentTitle}
                            onChange={ev => setComponentTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <ComponentSelect isRender={position !== null && position > 0} components={components} setComponent={handleSelectComponent} component_id={component_id || ""} />
                        <Label htmlFor="content" className="text-left">
                            Content
                        </Label>
                        <Textarea
                            ref={ref}
                            id="content"
                            value={content}
                            onChange={ev => setContent(ev.target.value)}
                            className="col-span-4 resize-y min-h-64 max-h-96"
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

export default CreateComponent