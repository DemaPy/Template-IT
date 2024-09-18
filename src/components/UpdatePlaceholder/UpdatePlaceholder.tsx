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
import {ErrorPage} from "@/pages/Error/Error"
import { useUpdateComponentPlaceholder } from "../../pages/Components/pages/hooks/useComponent"
import { useUpdateSectionPlaceholder } from "@/pages/Templates/pages/hooks/useSection"
import { Edit2 } from "lucide-react"

// Service: typeof SectionServiceDB | typeof ComponentServiceDB;

const UpdatePlaceholder = ({ service, placeholder_id, fallback, title, invalidate_key }: TUpdatePlaceholder) => {
    const [isOpen, setIsOpen] = useState(false)

    const [_title, setTitle] = useState<string>(title)
    const [_fallback, setFallback] = useState<string>(fallback)

    const { mutate: mutateComponentPlaceholder, isPending: isComponentPlaceholderPending, isError: isComponentPlaceholderError, error: updateComponentPlaceholderError } = useUpdateComponentPlaceholder({ invalidate_key })
    const { mutate: mutateSectionPlaceholder, isPending: isSectionPlaceholderPending, isError: isSectionPlaceholderError, error: updateSectionPlaceholderError } = useUpdateSectionPlaceholder({ invalidate_key })

    const mutate = service === "component" ? mutateComponentPlaceholder : mutateSectionPlaceholder
    const isPending = service === "component" ? isComponentPlaceholderPending : isSectionPlaceholderPending

    if (isComponentPlaceholderError) {
        return <ErrorPage error={updateComponentPlaceholderError} message={updateComponentPlaceholderError.message} path={`/components/`} />
    }

    if (isSectionPlaceholderError) {
        return <ErrorPage error={updateSectionPlaceholderError} message={updateSectionPlaceholderError.message} path={`/templates/`} />
    }

    return (
        <>
            <Button disabled={isPending} variant={"ghost"} onClick={() => setIsOpen(true)} size={"icon"}>
                <Edit2 className='w-4 h-4' />
            </Button>
            {
                isOpen && (
                    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
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
                                        value={_title || ""}
                                        onChange={ev => setTitle(ev.target.value)}
                                        className="col-span-4"
                                    />
                                    <Label htmlFor="content" className="text-left">
                                        Fallback
                                    </Label>
                                    <Input
                                        id="content"
                                        value={_fallback || ""}
                                        onChange={ev => setFallback(ev.target.value)}
                                        className="col-span-4"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={isPending} onClick={() => mutate({ id: placeholder_id, fallback: _fallback, title: _title })}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )
            }
        </>

    )
}

export default UpdatePlaceholder