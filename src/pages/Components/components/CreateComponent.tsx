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
import { useState } from "react"
import { useCreateComponent } from "../pages/hooks/useComponent"
import MustacheEditor from "@/components/MustacheEditor/MustacheEditor"
import { ParsedTemplate } from "@/components/MustacheEditor/types"


const CreateComponent = ({ isOpen, setClose }: TCreateComponent) => {

    const [title, setTitle] = useState<string>("")
    const [template, setTemplate] = useState<ParsedTemplate>({ placeholders: [], template: "", tokens: [] })

    const { isPending, mutate } = useCreateComponent()

    return (
        <Dialog open={isOpen} onOpenChange={setClose}>
            <DialogContent className="w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Create component</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input
                            id="name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <div className="col-span-4 flex gap-2">
                            <div className="w-full">
                                <Label
                                    className="text-left">
                                    Content
                                </Label>
                                <MustacheEditor setContent={(template) => setTemplate(template)} />
                            </div>
                            <div className="w-1/2">
                                <Label
                                    className="text-left">
                                    Placeholders
                                </Label>
                                <div className="flex flex-col gap-2">
                                    {template.placeholders.map(item => <p className="capitalize text-sm">{item.title}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={() => {
                        // mutate({
                        //     placeholders: template.placeholders,
                        //     tokens: template.tokens,
                        //     content: template.template,
                        //     title: title,
                        // })
                        console.log({
                            placeholders: template.placeholders,
                            tokens: template.tokens,
                            content: template.template,
                            title: title,
                        })
                        setClose()
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateComponent