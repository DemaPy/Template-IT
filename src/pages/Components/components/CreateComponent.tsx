import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useState } from "react"
import { useCreateComponent } from "../pages/hooks/useComponent"
import MustacheEditor from "@/components/MustacheEditor/MustacheEditor"
import { ParsedTemplate } from "@/components/MustacheEditor/types"
import Placehodlers from "./Placehodlers"


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
                    <div className="col-span-4">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input
                            id="name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        />
                    </div>
                    <div className="col-span-4">
                        <Tabs defaultValue="content">
                            <TabsList>
                                <TabsTrigger value="content">Content</TabsTrigger>
                                <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
                            </TabsList>
                            <TabsContent value="content">
                                <MustacheEditor value={template.template} setContent={(template) => setTemplate(template)} />
                            </TabsContent>
                            <TabsContent value="placeholders">
                                <div className="flex flex-col gap-2">
                                    <Placehodlers placehodlers={template.placeholders} />
                                </div>
                            </TabsContent>
                        </Tabs>
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