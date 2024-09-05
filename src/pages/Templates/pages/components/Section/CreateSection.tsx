import { PlusCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateSection } from '../../hooks/useSection'
import Error from '@/pages/Error/Error'
import Editor from '@/components/Editor/Editor'
import { CreatePlaceholders } from '@/services/types/Placeholder'
import ComponentsSkeleton from '@/pages/Components/components/ComponentsSkeleton'

const CreateSection = ({ template_id }: TCreateSection) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { isPending, isError, error, mutate } = useCreateSection({ invalidate_key: template_id })

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [placeholders, setPlaceholders] = useState<CreatePlaceholders['placeholders']>([])

    if (isPending) return <ComponentsSkeleton />

    if (isError) {
        return <Error error={error} message={error.message} path={`/templates/${template_id}`} />
    }

    const handleEditorSubmit = (data: EditorOnSubmitProps) => {
        setContent(data.content)
        setPlaceholders(data.placeholdersToCreate)
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
                                    mutate(({ templateId: template_id, content, title: title, placeholders }))
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