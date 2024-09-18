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
import { extractFields } from "@/components/MustacheEditor/utils/extractFields"
import { ShowValidationError } from "@/components"


const CreateComponent = ({ isOpen, setClose }: TCreateComponent) => {

    const [error, setErrorContent] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [tab, setTab] = useState<string>("content")
    const [title, setTitle] = useState<string>("")
    const [template, setTemplate] = useState<string>("")
    const [placeholders, setPlaceholders] = useState<Placeholder[]>([])

    const { isPending, mutate } = useCreateComponent()

    console.log(placeholders);
    
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
                            onChange={ev => {
                                setTitle(ev.target.value)
                                setErrorTitle("")
                            }}
                        />
                        <ShowValidationError error={errorTitle} />
                    </div>
                    <div className="col-span-4">
                        <Tabs value={tab} onValueChange={(tab) => {
                            if (!tab) return
                            try {
                                const parsedTemplate = extractFields({ template })
                                setErrorContent("")
                                setPlaceholders((parsedTemplate as ParsedTemplate).placeholders)
                                setTab(tab)
                                // TODO: set position cursor at problematic position tag
                            } catch (error) {
                                if (error instanceof Error) {
                                    setErrorContent(error.message)
                                    setTab("content")
                                }
                            }
                        }}>
                            <TabsList>
                                <TabsTrigger value="content">Content</TabsTrigger>
                                <TabsTrigger value="placeholders">Placeholders</TabsTrigger>
                            </TabsList>
                            <TabsContent value="content">
                                <MustacheEditor value={template} setContent={(template) => setTemplate(template)} />
                                <ShowValidationError error={error} />
                            </TabsContent>
                            <TabsContent value="placeholders">
                                <div className="flex flex-col gap-2 min-h-[420px] overflow-y-auto">
                                    <Placehodlers placeholders={placeholders} setPlaceholders={data => setPlaceholders(data)} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isPending} onClick={() => {

                        if (!placeholders.length) {
                            setErrorContent("Fulfill all placeholders.")
                            return
                        }

                        if (title.trim().length < 3) {
                            setErrorTitle("Title too short.")
                            return
                        }
                        mutate({
                            placeholders,
                            content: template,
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