
type Props = {
    sections: Component[]
}

const TemplateBuilder = ({ sections }: Props) => {

    let html = ''

    if (sections) {

        for (const section of sections) {
            let shift = 0
            const sectionPlaceholdersSort = section.placeholders?.toSorted((a, b) => a.position - b.position)
            const document = section.content.split("")
            // If data appears, placeholders also.
            for (const placeholder of sectionPlaceholdersSort!) {
                document.splice(placeholder.position + shift, 0, placeholder.fallback)
                shift++
            }

            html += document.join("")
        }
    }


    if (!sections) {
        return (
            <div className='w-full flex items-center justify-center flex-col text-md font-semibold text-center md:text-3xl'>Start adding sections</div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-2 relative bg-slate-50 p-2">
            {/* <iframe srcDoc={`<style>${campaign.css || ""}</style> ${html}`} className="h-full w-full"> */}
            <iframe srcDoc={`${html}`} className="h-full w-full">
            </iframe>
        </div>
    )
}

export default TemplateBuilder
