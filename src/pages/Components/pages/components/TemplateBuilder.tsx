import { decode } from 'html-entities';
import { useEffect, useRef, useState } from 'react';

type Props = {
    components: Component[]
}

const TemplateBuilder = ({ components }: Props) => {
    const [parsed, setParsed] = useState("")
    const ref = useRef<HTMLIFrameElement>(null)
    const component = components[0]

    if (component.placeholders.length === 0) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding placeholders</div>
        )
    }

    useEffect(() => {
        setParsed("")
        if (!ref.current) return
        const iframe = ref.current
        const iframeDoc = iframe.contentDocument
        if (iframeDoc?.readyState === "complete") {
            iframe.contentWindow!.onload = (ev) => {
                const allSpans = (ev.target as Document).body.querySelectorAll("[data-template-it_id]")
                if (allSpans && allSpans.length > 0) {
                    allSpans.forEach(item => {
                        const id = item.getAttribute("data-template-it_id")
                        const content = component.placeholders.find(item => item.id === id)!
                        item.insertAdjacentText("beforebegin", content?.fallback)
                        item.remove()
                    })
                }
                setParsed(decode((ev.target as Document).body.innerHTML))
            };
        }
    }, [components])

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            <iframe srcDoc={parsed} className="h-full w-full">
            </iframe>
            <iframe ref={ref} srcDoc={component.content} className="h-0 w-0 invisible">
            </iframe>
        </div>
    )
}

export default TemplateBuilder
