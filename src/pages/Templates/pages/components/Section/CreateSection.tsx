import { PlusCircle } from 'lucide-react'
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
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateSection } from '../../hooks/useSection'
import { ErrorPage } from '@/pages/Error/Error'
import { CreatePlaceholders } from '@/services/types/Placeholder'
import ComponentsSkeleton from '@/pages/Components/components/ComponentsSkeleton'
import MustacheEditor from '@/components/MustacheEditor/MustacheEditor'
import { ShowValidationError } from '@/components'
import Placehodlers from '@/pages/Components/components/Placehodlers'
import { extractFields } from '@/components/MustacheEditor/utils/extractFields'
import { ParsedTemplate } from '@/components/MustacheEditor/types'

const CreateSection = ({ template_id }: TCreateSection) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { isPending, isError, error, mutate } = useCreateSection({ invalidate_key: template_id })

    const [errorContent, setErrorContent] = useState("")
    const [errorTitle, setErrorTitle] = useState("")
    const [tab, setTab] = useState<string>("content")

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [placeholders, setPlaceholders] = useState<CreatePlaceholders['placeholders']>([])

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <ErrorPage error={error} message={error.message} path={`/templates/${template_id}`} />
    }

    const setClose = () => setIsOpen(false)

    return (
        <>
            <Button variant={"ghost"} className='bg-white rounded-md border sticky top-0 flex justify-between w-full font-normal' onClick={() => setIsOpen(true)}>Create section <PlusCircle className="w-4 h-4" /></Button>
            {
                isOpen && (
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
                                    <ShowValidationError error={errorTitle} />
                                    <div className="col-span-4">
                                        <Tabs value={tab} onValueChange={(tab) => {
                                            if (!tab) return
                                            try {
                                                const parsedTemplate = extractFields({ template: content })
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
                                                <MustacheEditor value={content} setContent={(template) => setContent(template)} />
                                                <ShowValidationError error={errorContent} />
                                            </TabsContent>
                                            <TabsContent value="placeholders">
                                                <div className="flex flex-col gap-2">
                                                    <Placehodlers placeholders={placeholders} setPlaceholders={data => setPlaceholders(data)} />
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
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
                                    mutate({ templateId: template_id, content, title: title, placeholders })
                                    setClose()
                                }}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )
            }
        </>

    )
}

export default CreateSection