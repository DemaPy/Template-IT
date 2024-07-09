import { decode } from "html-entities"

type Props = {
    sections: Section[]
}

const TemplateBuilder = ({ sections }: Props) => {
    let html = ""
    for (const section of sections) {
        const decode_html = section.content
        const doc = new DOMParser().parseFromString(decode_html, "text/html")

        for (const placeholder of section.placeholders) {
            const node = doc.querySelector(`[data-template-it_id='${placeholder.id}']`)
            if (!node) return
            node.insertAdjacentText("beforebegin", placeholder.fallback)
            node.remove()
        }

        html += doc.body.innerHTML
    }

    if (!sections) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding sections</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            <iframe srcDoc={decode(html)} className="h-full w-full">
            </iframe>
        </div>
    )
}

export default TemplateBuilder
