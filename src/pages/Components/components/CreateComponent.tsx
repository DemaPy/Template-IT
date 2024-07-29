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
import { CreatePlaceholders } from "@/services/types/Placeholder"
import Editor from "@/components/Editor/Editor"


const CreateComponent = ({ isOpen, setClose }: TCreateComponent) => {

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [placeholders, setPlaceholders] = useState<CreatePlaceholders['placeholders']>([])

    const { isPending, mutate } = useCreateComponent()

    const handleEditorSubmit = (data: EditorOnSubmitProps) => {
        setContent(data.content)
        setPlaceholders(data.placeholdersToCreate)
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
                            Title
                        </Label>
                        <Input
                            id="name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            className="col-span-4"
                        />
                        <div className="col-span-4 resize-y max-h-[500px] min-h-[300px]">
                            <Label htmlFor="content" className="text-left">
                                Content
                            </Label>
                            <Editor
                                content={content}
                                placeholders={[]}
                                isLoading={isPending}
                                isContentEditable={true}
                                onSubmit={handleEditorSubmit}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={() => {
                        mutate({
                            content: content,
                            title: title,
                            placeholders: placeholders
                        })
                        setClose()
                    }}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateComponent