import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ErrorPage from '@/pages/Error/Error';
import { ComponentService } from '@/services/DI/Component';
import { SectionService } from '@/services/DI/Section';
import { CreatePlaceholdersDTO } from '@/services/types/Placeholder';
import { usePlaceholderUpdateModal } from '@/store/placeholderUpdateModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    content: string
    item: Component | Section
    PlaceholderService: typeof ComponentService | typeof SectionService
}

export const Editor = ({ content, item, PlaceholderService }: Props) => {
    const queryClient = useQueryClient();

    const { isPending, isError, error, mutate } = useMutation({
        mutationFn: (placeholders: CreatePlaceholdersDTO) => {
            for (const key in placeholders) {
                const value = placeholders[key as keyof CreatePlaceholdersDTO]

                if (Array.isArray(value)) continue

                if (value.trim().length < 3) {
                    throw new Error(key.charAt(0).toUpperCase() + key.slice(1) + " too short.")
                }
            }
            return PlaceholderService.createPlaceholders(placeholders)
        },
        onSuccess: () => {
            toast.success("Placeholders has been created");
            if ("templateId" in item) {
                queryClient.invalidateQueries({ queryKey: [item.templateId] })
            } else {
                queryClient.invalidateQueries({ queryKey: [item.id] })
            }
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })

    const setOpen = usePlaceholderUpdateModal(state => state.setOpen)
    const setPlaceholder = usePlaceholderUpdateModal(state => state.setPlaceholder)

    const [position, setPosition] = useState<number | null>(null)

    const [title, setTitle] = useState("")
    const [fallback, setFallback] = useState("")

    const [placeholders, setPlaceholders] = useState<CreatePlaceholdersDTO['placeholders']>([])
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLIFrameElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputRef.current) return
        inputRef.current.focus()
    }, [position])

    useEffect(() => {
        if (!ref.current) return;
        const iframe = ref.current.contentDocument;
        if (!iframe) {
            toast.error("Document not found")
            return
        }
        const body = iframe.body;
        body.innerHTML = content
        for (const placeholder of item.placeholders) {
            const elem = body.querySelector(`[data-template-it_id='${placeholder.id}']`)
            if (!elem) return
            elem.textContent = placeholder.title
            elem.addEventListener("click", () => {
                setPlaceholder(placeholder)
                setOpen()
            })
        }
    }, [content]);

    useEffect(() => {
        if (!ref.current) return;
        const iframe = ref.current.contentDocument;

        const handleClick = (e: MouseEvent) => {
            if (!e.ctrlKey) return
            const isSpanPlaceholder = (e.target as HTMLElement).getAttribute("data-template-it_id");
            if (isSpanPlaceholder) return;

            if (!ref.current) return;
            const iframe = ref.current.contentDocument;
            if (!iframe) {
                toast.error("Document not found")
                return
            }
            const selection = iframe!.getSelection();
            if (!selection) return
            if (!selection.anchorNode) return
            if (selection.anchorNode.nodeName === "BODY") {
                toast.error("Please, select place.")
                return
            }
            setPosition(selection.anchorOffset)
            setIsEditing(true);
        };

        iframe!.addEventListener("click", handleClick);

        return () => {
            iframe!.removeEventListener("click", handleClick);
        };
    }, []);

    const handleSave = async () => {
        if (!ref.current) return;
        const iframe = ref.current.contentDocument;
        if (!iframe) {
            toast.error("Document not found")
            return
        }
        const body = iframe.body;
        mutate({ id: item.id, content: body.innerHTML, placeholders: placeholders })
        setIsEditing(false);
    }

    const handleAddPlaceholder = () => {
        if (fallback.trim().length < 3 || title.trim().length < 3) {
            return toast.error("Minimum length 3 symbols.")
        }

        if (!ref.current) return;
        const iframe = ref.current.contentDocument;
        if (!iframe) {
            toast.error("Document not found")
            return
        }
        const selection = iframe!.getSelection();
        if (!selection) return
        if (!selection.anchorNode) return
        if (selection.anchorNode.nodeName === "BODY") {
            toast.error("Please, select place.")
            return
        }
        // Create Range
        const range = new Range();
        range.setStart(selection.anchorNode!, selection.anchorOffset);
        selection.addRange(range);
        // Create ID
        const id = uuidv4()
        // Create Span
        const span = document.createElement("span");
        span.textContent = title
        span.style.cssText = "cursor: pointer; padding: 0.2rem 0.4rem; border-radius: 0.2rem; background: #095cec63; font-size: 14px; box-shadow: 0px 0px 5px #00000060";
        span.setAttribute("data-template-it_id", id);
        span.addEventListener("click", () => {
            console.log("Placeholder created");
        });
        range.insertNode(span);
        setPlaceholders(prev => ([...prev, { id: id, title, fallback }]))
        setTitle("");
        setFallback("");
        setPosition(null)
    }

    const handleCancel = () => {
        if (!ref.current) return;
        const iframe = ref.current.contentDocument;
        if (!iframe) {
            toast.error("Document not found")
            return
        }
        const body = iframe.body;
        body.innerHTML = content;
        setTitle("");
        setFallback("");
        setPosition(null)
        setIsEditing(false);
        setPlaceholders([])
    }
    if (isError) {
        toast.error(error.message);
        return <ErrorPage error={error} message={error.message} path="/" />
    }
    return (
        <>
            <iframe
                className='w-full min-h-64 bg-slate-50 rounded'
                ref={ref}
                src=""
                frameBorder="0"
            ></iframe>
            {isEditing && (
                <>
                    {position === 0 || position && (
                        <div className='p-4 bg-slate-50 rounded space-y-2'>
                            <Label className='flex flex-col gap-2'>
                                Title
                                <div className='flex items-stretch gap-2'>
                                    <Input ref={inputRef} value={title} onChange={(ev) => setTitle(ev.target.value)} />
                                    <Button variant={"outline"} onClick={handleAddPlaceholder}><PlusCircle className='w-4 h-4 mr-2' />Add</Button>
                                </div>
                            </Label>
                            <Label className='flex flex-col gap-2'>
                                Fallback
                                <Input value={fallback} onChange={(ev) => setFallback(ev.target.value)} />
                            </Label>
                        </div>
                    )}
                    <div className='flex gap-2'>
                        <Button onClick={handleCancel} className='w-full' variant={"ghost"} size={"sm"}>cancel</Button>
                        <Button disabled={isPending} onClick={handleSave} className='w-full' variant={"outline"} size={"sm"}>save</Button>
                    </div>
                </>
            )}
        </>
    )
}
