import { decode } from "html-entities"

type Props = {
    sections: Component[]
}

const TemplateBuilder = ({ sections }: Props) => {

    let html = ''

    for (const section of sections) {
        html += section.content
    }

    if (!sections) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding sections</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            {/* <iframe srcDoc={`<style>${campaign.css || ""}</style> ${html}`} className="h-full w-full"> */}

            <iframe srcDoc={`${decode(html)}`} className="h-full w-full">
            </iframe>
        </div>
    )
}

export default TemplateBuilder
