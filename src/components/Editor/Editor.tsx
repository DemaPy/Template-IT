import { CreatePlaceholders } from "@/services/types/Placeholder";
import { useEffect, useRef, useState } from "react";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from "react-hot-toast";

import { v4 as uuidv4 } from 'uuid';
import { isUserChangedSomethingInPlaceholders, createPlaceholderNode } from "./utils";
import { PlusCircle, X } from "lucide-react";
import Title from "../Title";
import { encode } from "html-entities";
import PlaceholderModal from "./PlaceholderModal";

const Editor = ({
  isLoading,
  content,
  placeholders,
  isContentEditable,
  onSubmit
}: EditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLIFrameElement>(null);

  const [position, setPosition] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [fallback, setFallback] = useState("")

  const [xy, setXY] = useState<{ x: number, y: number } | null>(null)

  const [_placeholders, setPlaceholders] = useState<CreatePlaceholders['placeholders']>([])

  const [error, setError] = useState('')

  // Focus on input when position selected
  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [position])

  // Initialize placeholders
  useEffect(() => {
    if (!ref.current) return;
    const iframe = ref.current.contentDocument;
    if (!iframe) {
      toast.error("Document not found")
      return
    }
    const body = iframe.body;
    body.contentEditable = String(isContentEditable)
    body.innerHTML = content

    const handlePaste = (ev: ClipboardEvent) => {
      ev.preventDefault()

      //@ts-ignore
      let paste = (ev.clipboardData || window.clipboardData).getData("text");
      const selection = iframe.getSelection();
      //@ts-ignore
      if (!selection.rangeCount) return;
      //@ts-ignore
      selection.getRangeAt(0).insertNode(document.createTextNode(encode(paste, { mode: "nonAsciiPrintableOnly" })))
    }

    body.addEventListener("paste", handlePaste)

    if (placeholders.length) {
      for (const placeholder of placeholders) {
        const elem: HTMLSpanElement | null = body.querySelector(`[data-template-it_id='${placeholder.id}']`)
        if (!elem) return
        elem.textContent = placeholder.title
        if (!isContentEditable) {
          elem.addEventListener("click", () => {
            console.log("Hanle placeholder click");
          })
        }
      }
    }
    return () => {
      body.removeEventListener("paste", handlePaste)
    }
  }, [content]);

  // Handle iframe click
  // Set cursor position
  useEffect(() => {
    if (!ref.current) return;
    const iframe = ref.current.contentDocument;
    if (!iframe) {
      toast.error("Document not found.")
      return
    }
    const handleClick = (e: MouseEvent | TouchEvent) => {

      if (e.ctrlKey || e.metaKey) {
        const isSpanPlaceholder = (e.target as HTMLElement).getAttribute("data-template-it_id");
        if (isSpanPlaceholder) return;

        if (!ref.current) return;
        const iframe = ref.current.contentDocument;
        if (!iframe) {
          toast.error("Document not found")
          return
        }
        const selection = iframe.getSelection();
        if (!selection) return
        if (!selection.anchorNode) return
        if (selection.anchorNode.nodeName === "BODY") {
          toast.error("Please, select place.")
          return
        }

        if (e instanceof MouseEvent) {
          setPosition(selection.anchorOffset)
          setXY({ x: e.clientX, y: e.clientY })
        } else {
          var touch = e.touches[0];
          var x = touch.pageX;
          var y = touch.pageY;
          // or taking offset into consideration
          // var x_2 = touch.pageX - iframe.body.offsetLeft;
          // var y_2 = touch.pageY - iframe.body.offsetTop;
          setXY({ x: x, y: y })
        }
      }
    };

    iframe.addEventListener("click", handleClick);
    iframe.addEventListener('touchstart', handleClick);

    return () => {
      iframe.removeEventListener("click", handleClick);
      iframe.removeEventListener('touchstart', handleClick);

    };
  }, []);

  // Insert placeholder to cursor position
  const handleAddPlaceholder = () => {
    if (fallback.trim().length < 3 || title.trim().length < 3) {
      setError("Minimum length 3 symbols.")
      return
    }

    if (!ref.current) return;
    const iframe = ref.current.contentDocument;
    if (!iframe) {
      setError("Document not found.")
      return
    }
    const selection = iframe.getSelection();
    if (!selection) {
      setError("Please, select place.")
      return
    }
    if (!selection.anchorNode) return
    if (selection.anchorNode.nodeName === "BODY") {
      setError("Please, select place.")
      return
    }

    // Create Range
    const range = new Range();
    range.setStart(selection.anchorNode!, selection.anchorOffset);
    selection.addRange(range);
    // Create ID
    const id = uuidv4()
    // Create Span
    range.insertNode(createPlaceholderNode({
      id: id,
      title: title,
      clickEventHandler: (ev) => {
        console.log(ev);
        console.log("Placeholder created");
      }
    }));
    setPlaceholders(prev => ([...prev, { id: id, title, fallback }]))
    handleReset()
  }

  const handleReset = () => {
    setTitle("");
    setFallback("");
    setPosition(null)
  }

  const handleSave = async () => {
    if (!ref.current) return;
    const iframe = ref.current.contentDocument;
    if (!iframe) {
      setError("Document not found")
      return
    }
    const body = iframe.body;
    const unsafeHTML = body.innerHTML

    try {
      const { html, _placehodlersToDelete } = isUserChangedSomethingInPlaceholders({ html: unsafeHTML, placehodlers: [..._placeholders, ...placeholders] })
      onSubmit({ content: html, placeholdersToDelete: _placehodlersToDelete, placeholdersToCreate: _placeholders })
      setPosition(null)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        return
      }
      setError("Unexpected error happend")
    }
  }

  const handleCancel = () => {
    if (!ref.current) return;
    const iframe = ref.current.contentDocument;
    if (!iframe) {
      setError("Document not found")
      return
    }
    const body = iframe.body;
    body.innerHTML = content;
    handleReset()
    setPlaceholders([])
  }

  const isModalActive = xy !== null
  console.log({ isModalActive, xy });

  return (
    <div className="space-y-4 relative">
      <iframe
        className='w-full min-h-64 bg-slate-50 rounded'
        ref={ref}
        src=""
        frameBorder="0"
      ></iframe>
      {position !== null && (
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
        <Button disabled={isLoading} onClick={handleCancel} className='w-full' variant={"ghost"} size={"sm"}>cancel</Button>
        <Button disabled={isLoading} onClick={handleSave} className='w-full' variant={"outline"} size={"sm"}>save</Button>
      </div>
      <Title title="Hold Ctr or Cmd and Click to start" size="xxs" color="neutral" />
      {error && (<div>
        <Title title={error} size="xxs" color="default" />
        <Button onClick={() => setError("")}><X className="w-4 h-4" /></Button>
      </div>)}
      {isModalActive && (
        <PlaceholderModal handler={() => setXY(null)} x={xy.x} y={xy.y} />
      )}
    </div>
  )
}

export default Editor