import { decode } from "html-entities"
import { useEffect, useRef, useState } from "react"

type Props = {
    sections: Section[]
}

const TemplateBuilder = ({ sections }: Props) => {
    const [parsed, setParsed] = useState("")
    const ref = useRef<HTMLIFrameElement>(null)

    let html = ""
    for (const section of sections) {
        html += section.content
    }
    
    useEffect(() => {
        setParsed("")
        if (!ref.current) return
        const iframe = ref.current
        const iframeDoc = iframe.contentDocument
        if (iframeDoc?.readyState === "complete") {
            iframe.contentWindow!.onload = (ev) => {
                for (const section of sections) {
                    const allSpans = (ev.target as Document).body.querySelectorAll("[data-template-it_id]")
                    if (allSpans && allSpans.length > 0) {
                        allSpans.forEach(item => {
                            const id = item.getAttribute("data-template-it_id")
                            const content = section.placeholders.find(item => item.id === id)!
                            if (content) {
                                item.insertAdjacentText("beforebegin", content?.fallback)
                                item.remove()
                            }
                        })
                    }
                }

                setParsed(decode((ev.target as Document).body.innerHTML))
            };
        }
    }, [sections])

    if (!sections) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding sections</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            <iframe srcDoc={parsed} className="h-full w-full">
            </iframe>
            <iframe ref={ref} srcDoc={html} className="h-0 w-0 invisible">
            </iframe>
        </div>
    )
}

export default TemplateBuilder
